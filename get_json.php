<?php
header('Content-Type: application/json');

// Simple security: whitelist types
$allowedTypes = ['np', 'aonb', 'spa', 'nnr'];
$type = $_GET['type'] ?? 'np';

if (!in_array($type, $allowedTypes)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid type']);
  exit;
}

// Construct file path
$filename = "geojson/{$type}.json"; // e.g., geojson/np.json
if (!file_exists($filename)) {
  http_response_code(404);
  echo json_encode(['error' => 'File not found']);
  exit;
}

// Return GeoJSON content
echo file_get_contents($filename);
?>
