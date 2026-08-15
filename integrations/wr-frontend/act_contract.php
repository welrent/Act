<?php
/**
 * Welrent Act bridge — drop into wr-frontend (api/act_contract.php or require from rentals.php)
 *
 * After a booking is inserted in wr-frontend, call:
 *   welrent_act_create_contract([...]);
 *
 * Env (optional):
 *   ACT_API_URL=https://act.welrent.com
 */
function welrent_act_api_base(): string {
    $fromEnv = getenv('ACT_API_URL') ?: ($_ENV['ACT_API_URL'] ?? '');
    if ($fromEnv) {
        return rtrim($fromEnv, '/');
    }
    return 'https://act.welrent.com';
}

/**
 * @param array $payload booking fields (uid, car_name|vehicle_name, start_date, end_date, ...)
 * @return array|null decoded Act response or null on soft failure
 */
function welrent_act_create_contract(array $payload): ?array {
    $url = welrent_act_api_base() . '/api/contracts';

    // Normalize wr-frontend rental fields → Act contract fields
    if (empty($payload['vehicle_name']) && !empty($payload['car_name'])) {
        $payload['vehicle_name'] = $payload['car_name'];
    }
    if (empty($payload['vehicle_image']) && !empty($payload['car_image'])) {
        $payload['vehicle_image'] = $payload['car_image'];
    }
    if (empty($payload['vehicle_type'])) {
        $payload['vehicle_type'] = 'car';
    }
    $payload['source'] = $payload['source'] ?? 'wr-frontend';

    $json = json_encode($payload);
    if ($json === false) {
        return null;
    }

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_HTTPHEADER     => [
                'Content-Type: application/json',
                'X-Welrent-Source: wr-frontend',
            ],
            CURLOPT_POSTFIELDS     => $json,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 8,
        ]);
        $raw = curl_exec($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($raw === false || $code >= 400) {
            error_log('[Welrent Act] contract create failed HTTP ' . $code . ' body=' . substr((string) $raw, 0, 300));
            return null;
        }
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : null;
    }

    $ctx = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/json\r\nX-Welrent-Source: wr-frontend\r\n",
            'content' => $json,
            'timeout' => 8,
            'ignore_errors' => true,
        ],
    ]);
    $raw = @file_get_contents($url, false, $ctx);
    if ($raw === false) {
        error_log('[Welrent Act] contract create failed (file_get_contents)');
        return null;
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : null;
}
