export const projects = [
  {
    id: 'hidroponnik-pwa',
    title: 'Hydroponics PWA & Real-time IoT System',
    milestoneTitle: 'Hydroponics Smart Monitoring System',
    date: 'Jul 2026',
    version: 'v2.1.0',
    status: 'Completed',
    category: 'Web & IoT',
    tags: ['JavaScript', 'React PWA', 'Vercel', 'ESP32'],
    shortDescription: 'Progressive Web Application for real-time hydroponics monitoring and hardware sensor control.',
    overview: 'A Progressive Web App designed to monitor water pH, temperature, and nutrient levels in hydroponic systems in real-time. Deployed on Vercel with offline PWA service worker support.',
    highlights: [
      'Real-time Firebase RTDB integration for instantaneous sensor readings',
      'PWA capabilities allowing offline access and home-screen installation',
      'Automated relay control for water pump and nutrient dosing'
    ],
    codeSnippet: `// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}`,
    codeLanguage: 'javascript',
    repoUrl: 'https://github.com/Antares023/hidroponnik-pwa',
    screenshots: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'NutriscanAI',
    title: 'NutriScan AI Vision Engine',
    milestoneTitle: 'Computer Vision Food & Nutrition Model',
    date: 'Jan 2026',
    version: 'v1.0.0',
    status: 'Completed',
    category: 'AI & ML',
    tags: ['Python', 'Machine Learning', 'Computer Vision', 'TensorFlow'],
    shortDescription: 'AI computer vision model for automated food recognition and nutritional analysis.',
    overview: 'An Artificial Intelligence project using Python, OpenCV, and Deep Neural Networks to scan and estimate nutritional values from food image inputs.',
    highlights: [
      'Automated bounding box detection for multi-item food plates',
      'Nutritional breakdown prediction using trained CNN weights',
      'Preprocessed dataset augmentation using OpenCV pipeline'
    ],
    codeSnippet: `import cv2
import numpy as np
from tensorflow.keras.models import load_model

model = load_model('nutriscan_model.h5')

def analyze_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))
    img = np.expand_dims(img, axis=0) / 255.0
    predictions = model.predict(img)
    return predictions`,
    codeLanguage: 'python',
    repoUrl: 'https://github.com/Antares023/NutriscanAI',
    screenshots: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'fuzzy_tingkat_stress_mahasiswa',
    title: 'Fuzzy Logic Student Stress Evaluator',
    milestoneTitle: 'Fuzzy Inference Expert System',
    date: 'Jun 2025',
    version: 'v1.2.0',
    status: 'Completed',
    category: 'AI & ML',
    tags: ['Python', 'Fuzzy Logic', 'Inference System'],
    shortDescription: 'Fuzzy logic expert system evaluating student mental stress levels.',
    overview: 'An implementation of Fuzzy Logic Inference Systems (FIS) in Python to analyze and categorize the stress levels of university students based on academic workload, sleep duration, and activity.',
    highlights: [
      'Scikit-Fuzzy rule matrix with triangular & trapezoidal membership functions',
      'De-fuzzification output mapping for action recommendations',
      'High accuracy agreement with psychologist baseline evaluations'
    ],
    codeSnippet: `import skfuzzy as fuzz
from skfuzzy import control as ctrl
import numpy as np

# Antecedents & Consequents
sleep = ctrl.Antecedent(np.arange(0, 11, 1), 'sleep')
workload = ctrl.Antecedent(np.arange(0, 11, 1), 'workload')
stress = ctrl.Consequent(np.arange(0, 101, 1), 'stress')

sleep.automf(3)
workload.automf(3)

# Custom triangular membership functions
stress['low'] = fuzz.trimf(stress.universe, [0, 0, 50])
stress['medium'] = fuzz.trimf(stress.universe, [0, 50, 100])
stress['high'] = fuzz.trimf(stress.universe, [50, 100, 100])`,
    codeLanguage: 'python',
    repoUrl: 'https://github.com/Antares023/fuzzy_tingkat_stress_mahasiswa',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'Kelulusan_Mahasiswa_ANN',
    title: 'Graduation Likelihood Neural Network',
    milestoneTitle: 'Academic Performance Predictor',
    date: 'May 2025',
    version: 'v1.0.0',
    status: 'Completed',
    category: 'AI & ML',
    tags: ['Python', 'ANN', 'Data Science', 'Scikit-Learn'],
    shortDescription: 'Artificial Neural Network predicting university student graduation outcomes.',
    overview: 'A machine learning classification model utilizing Artificial Neural Networks to forecast student graduation timelines based on GPA trends, course credits, and attendance.',
    highlights: [
      'Multi-Layer Perceptron (MLP) architecture tuned for tabular student data',
      'Data preprocessing pipeline handling missing records and normalization',
      'Model evaluation achieving >88% prediction accuracy'
    ],
    codeSnippet: `from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

ann = MLPClassifier(hidden_layer_sizes=(10, 10), max_iter=1000)
ann.fit(X_train, y_train)

accuracy = ann.score(X_test, y_test)
print(f"Model Accuracy: {accuracy * 100:.2f}%")`,
    codeLanguage: 'python',
    repoUrl: 'https://github.com/Antares023/Kelulusan_Mahasiswa_ANN',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'aplikasi-penjualan-sederhana',
    title: 'Laravel Point-of-Sale & Inventory',
    milestoneTitle: 'Retail Sales Management Application',
    date: 'May 2025',
    version: 'v1.0.0',
    status: 'Completed',
    category: 'Web',
    tags: ['PHP', 'Laravel', 'Blade', 'MySQL'],
    shortDescription: 'Web-based point-of-sale and inventory control platform.',
    overview: 'A full-featured sales application built using the Laravel framework and Blade templates, managing store transactions, stock levels, and sales analytics reports.',
    highlights: [
      'Role-based access control (Admin & Cashier modules)',
      'Automated inventory deduction upon order placement',
      'Sales summary PDF and Excel report generation'
    ],
    codeSnippet: `@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Sales Dashboard</h2>
    <table class="table">
        <thead>
            <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
            </tr>
        </thead>
        <tbody>
            @foreach($sales as $sale)
            <tr>
                <td>{{ $sale->item_name }}</td>
                <td>{{ $sale->price }}</td>
                <td>{{ $sale->quantity }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection`,
    codeLanguage: 'php',
    repoUrl: 'https://github.com/Antares023/aplikasi-penjualan-sederhana',
    screenshots: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'termoapp',
    title: 'TermoApp Smart Thermostat',
    milestoneTitle: 'TermoApp IoT Temperature Controller',
    date: 'Aug 2026',
    version: 'v1.0.0',
    status: 'Completed',
    category: 'Embedded',
    tags: ['C++', 'Arduino', 'ESP32', 'IoT'],
    shortDescription: 'IoT-based smart thermostat for remote temperature monitoring and relay control.',
    overview: 'TermoApp is an Embedded Systems project using ESP32 to read environmental temperatures via sensors and trigger cooling/heating relays automatically. Features a mobile-responsive dashboard for manual override.',
    highlights: [
      'Real-time MQTT telemetry for temperature monitoring',
      'Configurable threshold triggers for automatic relay control',
      'Web-based local dashboard hosted on ESP32 SPIFFS'
    ],
    codeSnippet: `void loop() {
  float temp = dht.readTemperature();
  
  if (temp > thresholdTemp) {
    digitalWrite(RELAY_PIN, HIGH); // Turn on cooling
    client.publish("termoapp/status", "COOLING");
  } else {
    digitalWrite(RELAY_PIN, LOW);
  }
  
  delay(2000);
}`,
    codeLanguage: 'cpp',
    repoUrl: 'https://github.com/khairulanwarudin/mbguutbeef',
    screenshots: [
      'https://images.unsplash.com/photo-1592089416462-2b0cb7da8379?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1580584126903-c17d41830450?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'aquasync',
    title: 'AquaSync Smart Aquarium',
    milestoneTitle: 'AquaSync Automated Ecosystem',
    date: 'Aug 2026',
    version: 'v1.1.0',
    status: 'Production',
    category: 'Embedded',
    tags: ['C++', 'ESP8266', 'IoT', 'Hardware'],
    shortDescription: 'Automated aquarium maintenance system with scheduled feeding and water quality sensors.',
    overview: 'AquaSync integrates hardware sensors to maintain an optimal aquarium ecosystem. It tracks pH and turbidity, while a servo motor manages scheduled fish feeding, all logged to a cloud server.',
    highlights: [
      'Servo-motor based automated feeder with RTC scheduling',
      'Analog turbidity and pH sensor data processing',
      'Alert notifications for critical water condition drops'
    ],
    codeSnippet: `void feedFish() {
  feederServo.write(90);
  delay(1000);
  feederServo.write(0);
  Serial.println("Feeding completed.");
}

// Scheduled check
if (currentHour == feedHour && currentMinute == feedMinute) {
  feedFish();
}`,
    codeLanguage: 'cpp',
    repoUrl: 'https://github.com/Antares023',
    screenshots: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=1000'
    ]
  }
];
