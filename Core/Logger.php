<?php
class Logger {
    public static function log($message) {
        $logFile = __DIR__ . '/../system_logs.log';
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
        $time = date('Y-m-d H:i:s');
        $line = "[$time] [$ip] $message\n";
        file_put_contents($logFile, $line, FILE_APPEND);
    }
}
