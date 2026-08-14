<?php
// Ensure this is loaded safely inside the internal proxy block
$logFile = __DIR__ . '/../../system_logs.log';
$logs = file_exists($logFile) ? file($logFile) : ['No logs available yet.'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Activity Logs - Secret Panel</title>
    <style>
        body { font-family: 'SF Mono', Consolas, monospace; background: #2A303C; color: #C0BDC8; padding: 2rem; margin: 0; }
        h2 { color: #8EB9FF; margin-top: 0; }
        .log-box { 
            background: #1E232C; 
            padding: 1.5rem; 
            border-radius: 8px; 
            overflow-x: auto; 
            white-space: pre-wrap; 
            line-height: 1.5;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
        }
        .log-entry { font-size: 13px; border-bottom: 1px solid #2A303C; padding-bottom: 4px; margin-bottom: 4px; }
        .log-entry:hover { color: #FFF; background: #2A303C; }
    </style>
</head>
<body>
    <h2>System Security & Access Logs</h2>
    <p>Viewing raw traffic parsed implicitly from the internal Core Logger.</p>
    <div class="log-box"><?php 
        foreach(array_reverse($logs) as $l) {
            echo "<div class='log-entry'>" . htmlspecialchars($l) . "</div>";
        }
    ?></div>
</body>
</html>
