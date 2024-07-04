<?php
$apiKey = 'YOUR_API_KEY';
$url = 'https://publicapi.nationsglory.fr/playercount';

$options = [
    'http' => [
        'method' => 'GET',
        'header' => "Accept: application/json\r\n" .
                    "Authorization: Bearer $apiKey\r\n"
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === FALSE) {
    die('Error occurred');
}

$data = json_decode($response, true);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Fetch Example</title>
</head>
<body>
    <p id="apiResponse"><?php echo json_encode($data, JSON_PRETTY_PRINT); ?></p>
</body>
</html>
