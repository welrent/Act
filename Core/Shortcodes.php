<?php
/**
 * Shortcode Parser Engine
 * Processes bracket logic dynamically mapped into secure HTML elements.
 */
class Shortcodes {
    public static function parse($content) {
        if (!$content) return '';

        // System Year Generation: [year]
        $content = str_replace('[year]', date('Y'), $content);

        // Interactive Button Shell: [button url="..." text="..."]
        $content = preg_replace_callback('/\[button\s+url="([^"]+)"\s+text="([^"]+)"\]/i', function($matches) {
            return '<a href="' . htmlspecialchars($matches[1]) . '" class="design-pill text-decoration-none my-2" style="background-color:#2F214B; color:#FFF; display:inline-block; padding:10px 24px; border-radius:6px; font-weight:600; box-shadow:0 4px 10px rgba(47,33,75,0.2); transition:transform 0.2s;">' . htmlspecialchars($matches[2]) . '</a>';
        }, $content);

        // Alert Status Nodes: [alert_box msg="..."]
        $content = preg_replace_callback('/\[alert_box\s+msg="([^"]+)"\]/i', function($matches) {
            return '<div style="background-color:rgba(239, 65, 53, 0.1); border-left:4px solid #EF4135; padding:12px 16px; margin:16px 0; border-radius:4px; color:#2F214B; font-weight:500;">' . htmlspecialchars($matches[1]) . '</div>';
        }, $content);

        return $content;
    }
}
