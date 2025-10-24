// ============================================
// MARITING - Modern Hotel Benchmarking Platform
// ============================================

// Global Variables
let uploadedData = null;
let currentLanguage = 'en';
let charts = [];
let demoChart = null;
demoAnimationInterval = null;

// Platform logo mapping
const platformLogos = {
    'booking': 'Logo/Plataformas/Booking.com_Logo.svg.png',
    'airbnb': 'Logo/Plataformas/Airbnb_Logo_Bélo.svg.png',
    'expedia': 'Logo/Plataformas/Expedia_Logo_2023.svg.png',
    'google': 'Logo/Plataformas/Google_Hotels_logo.png',
    'tripadvisor': 'Logo/Plataformas/Tripadvisor-Logo.png',
    'trivago': 'Logo/Plataformas/Trivago.svg.png'
};

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
    en: {
        nav: {
            home: 'Home',
            about: 'About Us',
            contact: 'Contact'
        },
        hero: {
            title: 'Competitive Intelligence<br>for Hotels',
            subtitle: 'Transform your pricing strategy with AI-powered market analysis'
        },
        step1: {
            title: 'Download Template',
            description: 'Download our template and fill it with your hotel data and competitor information.',
            download: 'Download Template'
        },
        step2: {
            title: 'Upload Your Data',
            drag_drop: 'Drag & Drop your file here',
            or: 'or',
            browse: 'Browse Files'
        },
        step3: {
            title: 'Configure Analysis',
            room_types: 'Room Types',
            single: 'Single Room',
            double: 'Double Room',
            days: 'Days of Week',
            all_days: 'All Days',
            specific_day: 'Specific Day',
            generate: 'Generate Analysis'
        },
        days: {
            monday: 'Monday',
            tuesday: 'Tuesday',
            wednesday: 'Wednesday',
            thursday: 'Thursday',
            friday: 'Friday',
            saturday: 'Saturday',
            sunday: 'Sunday'
        },
        ai: {
            analyze: 'AI Strategic Analysis',
            title: 'AI Strategic Analysis',
            loading: 'Analyzing your market position...'
        },
        chart: {
            title: 'Competitive Position Analysis',
            price: 'Price (€)',
            rating: 'Rating',
            my_hotel: 'Your Hotel',
            platform: 'Platform'
        },
        perception: {
            premium: 'Premium Position - Your hotel has excellent ratings and commands premium pricing. Customers perceive strong value.',
            value_leader: 'Value Leader - High quality at competitive prices. Excellent perceived value, potential to increase rates.',
            overpriced: 'Overpriced Risk - Below quality threshold with above-average pricing. Customers may perceive poor value.',
            budget: 'Budget Segment - Aligned pricing and quality expectations for price-conscious customers.',
            underrated_expensive: 'Needs Attention - Low credibility (few reviews) with high pricing. Build trust with more reviews.',
            underrated_cheap: 'Emerging Budget - Low credibility but competitive pricing. Focus on building review base.'
        },
        footer: {
            title: 'Why Choose Mariting?',
            visual: {
                title: 'Visual Competition Analysis',
                text: "See your hotel's position versus competitors in easy-to-understand scatter plots"
            },
            daily: {
                title: 'Day-by-Day Analysis',
                text: 'Analyze pricing patterns across different days of the week'
            },
            room: {
                title: 'Room Type Comparison',
                text: 'Compare single and double room pricing separately or together'
            },
            template: {
                title: 'Easy Excel Template',
                text: 'Simple template to fill with your competition data'
            },
            mobile: {
                title: 'Mobile Responsive',
                text: 'Access your analysis from any device, anywhere'
            },
            export: {
                title: 'Export Results',
                text: 'Download your charts for presentations and reports'
            }
        },
        alerts: {
            file_uploaded: 'File uploaded successfully!',
            select_room: 'Please select at least one room type',
            select_day: 'Please select at least one day option',
            error: 'Error processing file'
        }
    },
    es: {
        nav: {
            home: 'Inicio',
            about: 'Acerca de',
            contact: 'Contacto'
        },
        hero: {
            title: 'Inteligencia Competitiva<br>para Hoteles',
            subtitle: 'Transforma tu estrategia de precios con análisis de mercado impulsado por IA'
        },
        step1: {
            title: 'Descargar Plantilla',
            description: 'Descarga nuestra plantilla y complétala con los datos de tu hotel e información de la competencia.',
            download: 'Descargar Plantilla'
        },
        step2: {
            title: 'Sube tus Datos',
            drag_drop: 'Arrastra y suelta tu archivo aquí',
            or: 'o',
            browse: 'Examinar Archivos'
        },
        step3: {
            title: 'Configurar Análisis',
            room_types: 'Tipos de Habitación',
            single: 'Habitación Individual',
            double: 'Habitación Doble',
            days: 'Días de la Semana',
            all_days: 'Todos los Días',
            specific_day: 'Día Específico',
            generate: 'Generar Análisis'
        },
        days: {
            monday: 'Lunes',
            tuesday: 'Martes',
            wednesday: 'Miércoles',
            thursday: 'Jueves',
            friday: 'Viernes',
            saturday: 'Sábado',
            sunday: 'Domingo'
        },
        ai: {
            analyze: 'Análisis Estratégico IA',
            title: 'Análisis Estratégico IA',
            loading: 'Analizando tu posición en el mercado...'
        },
        chart: {
            title: 'Análisis de Posición Competitiva',
            price: 'Precio (€)',
            rating: 'Calificación',
            my_hotel: 'Tu Hotel',
            platform: 'Plataforma'
        },
        perception: {
            premium: 'Posición Premium - Tu hotel tiene excelentes calificaciones y precios premium. Los clientes perciben gran valor.',
            value_leader: 'Líder en Valor - Alta calidad a precios competitivos. Excelente valor percibido, potencial para aumentar tarifas.',
            overpriced: 'Riesgo de Sobreprecio - Por debajo del umbral de calidad con precios superiores al promedio. Los clientes pueden percibir poco valor.',
            budget: 'Segmento Económico - Alineación de precio y expectativas de calidad para clientes conscientes del precio.',
            underrated_expensive: 'Necesita Atención - Baja credibilidad (pocas reseñas) con precios altos. Construir confianza con más reseñas.',
            underrated_cheap: 'Económico Emergente - Baja credibilidad pero precios competitivos. Enfocarse en construir base de reseñas.'
        },
        footer: {
            title: '¿Por qué elegir Mariting?',
            visual: {
                title: 'Análisis Visual de Competencia',
                text: 'Ve la posición de tu hotel versus competidores en gráficos de dispersión fáciles de entender'
            },
            daily: {
                title: 'Análisis Día a Día',
                text: 'Analiza patrones de precios a través de diferentes días de la semana'
            },
            room: {
                title: 'Comparación de Tipos de Habitación',
                text: 'Compara precios de habitaciones individuales y dobles por separado o juntas'
            },
            template: {
                title: 'Plantilla Excel Fácil',
                text: 'Plantilla simple para completar con tus datos de competencia'
            },
            mobile: {
                title: 'Responsivo Móvil',
                text: 'Accede a tu análisis desde cualquier dispositivo, en cualquier lugar'
            },
            export: {
                title: 'Exportar Resultados',
                text: 'Descarga tus gráficos para presentaciones e informes'
            }
        },
        alerts: {
            file_uploaded: '¡Archivo subido exitosamente!',
            select_room: 'Por favor selecciona al menos un tipo de habitación',
            select_day: 'Por favor selecciona al menos una opción de día',
            error: 'Error al procesar el archivo'
        }
    },
    de: {
        nav: {
            home: 'Startseite',
            about: 'Über uns',
            contact: 'Kontakt'
        },
        hero: {
            title: 'Wettbewerbsintelligenz<br>für Hotels',
            subtitle: 'Transformieren Sie Ihre Preisstrategie mit KI-gestützter Marktanalyse'
        },
        step1: {
            title: 'Vorlage Herunterladen',
            description: 'Laden Sie unsere Vorlage herunter und füllen Sie sie mit Ihren Hoteldaten und Wettbewerbsinformationen.',
            download: 'Vorlage Herunterladen'
        },
        step2: {
            title: 'Daten Hochladen',
            drag_drop: 'Datei hier ablegen',
            or: 'oder',
            browse: 'Dateien Durchsuchen'
        },
        step3: {
            title: 'Analyse Konfigurieren',
            room_types: 'Zimmertypen',
            single: 'Einzelzimmer',
            double: 'Doppelzimmer',
            days: 'Wochentage',
            all_days: 'Alle Tage',
            specific_day: 'Bestimmter Tag',
            generate: 'Analyse Erstellen'
        },
        days: {
            monday: 'Montag',
            tuesday: 'Dienstag',
            wednesday: 'Mittwoch',
            thursday: 'Donnerstag',
            friday: 'Freitag',
            saturday: 'Samstag',
            sunday: 'Sonntag'
        },
        ai: {
            analyze: 'KI-Strategieanalyse',
            title: 'KI-Strategieanalyse',
            loading: 'Analysiere Ihre Marktposition...'
        },
        chart: {
            title: 'Wettbewerbspositionsanalyse',
            price: 'Preis (€)',
            rating: 'Bewertung',
            my_hotel: 'Ihr Hotel',
            platform: 'Plattform'
        },
        perception: {
            premium: 'Premium-Position - Ihr Hotel hat ausgezeichnete Bewertungen und Premium-Preise. Kunden nehmen starken Wert wahr.',
            value_leader: 'Wertführer - Hohe Qualität zu wettbewerbsfähigen Preisen. Ausgezeichneter wahrgenommener Wert, Potenzial für Preiserhöhungen.',
            overpriced: 'Überteuert Risiko - Unter Qualitätsschwelle mit überdurchschnittlichen Preisen. Kunden könnten schlechten Wert wahrnehmen.',
            budget: 'Budget-Segment - Ausgerichtete Preis- und Qualitätserwartungen für preisbewusste Kunden.',
            underrated_expensive: 'Benötigt Aufmerksamkeit - Geringe Glaubwürdigkeit (wenige Bewertungen) mit hohen Preisen. Vertrauen mit mehr Bewertungen aufbauen.',
            underrated_cheap: 'Aufstrebendes Budget - Geringe Glaubwürdigkeit aber wettbewerbsfähige Preise. Fokus auf Aufbau der Bewertungsbasis.'
        },
        footer: {
            title: 'Warum Mariting wählen?',
            visual: {
                title: 'Visuelle Wettbewerbsanalyse',
                text: 'Sehen Sie die Position Ihres Hotels im Vergleich zur Konkurrenz in leicht verständlichen Streudiagrammen'
            },
            daily: {
                title: 'Tag-für-Tag-Analyse',
                text: 'Analysieren Sie Preismuster über verschiedene Wochentage hinweg'
            },
            room: {
                title: 'Zimmertyp-Vergleich',
                text: 'Vergleichen Sie Einzel- und Doppelzimmerpreise separat oder zusammen'
            },
            template: {
                title: 'Einfache Excel-Vorlage',
                text: 'Einfache Vorlage zum Ausfüllen mit Ihren Wettbewerbsdaten'
            },
            mobile: {
                title: 'Mobile Responsive',
                text: 'Greifen Sie von jedem Gerät und überall auf Ihre Analyse zu'
            },
            export: {
                title: 'Ergebnisse Exportieren',
                text: 'Laden Sie Ihre Diagramme für Präsentationen und Berichte herunter'
            }
        },
        alerts: {
            file_uploaded: 'Datei erfolgreich hochgeladen!',
            select_room: 'Bitte wählen Sie mindestens einen Zimmertyp',
            select_day: 'Bitte wählen Sie mindestens eine Tagesoption',
            error: 'Fehler beim Verarbeiten der Datei'
        }
    }
};

// ============================================
// DEMO CHART ANIMATION (6 seconds, transparent background)
// ============================================
function initDemoChart() {
    const ctx = document.getElementById('demoChart').getContext('2d');
    
    // Three different scenarios
    const scenarios = [
        {
            datasets: [
                { label: 'Your Hotel', data: [{x: 120, y: 8.5, r: 10}], backgroundColor: 'rgba(99, 102, 241, 0.7)', borderColor: 'rgba(99, 102, 241, 1)', borderWidth: 3 },
                { label: 'Competitor A', data: [{x: 95, y: 8.2, r: 8}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 },
                { label: 'Competitor B', data: [{x: 150, y: 9.1, r: 12}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 },
                { label: 'Competitor C', data: [{x: 110, y: 7.8, r: 7}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 },
                { label: 'Competitor D', data: [{x: 85, y: 7.5, r: 6}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 }
            ]
        },
        {
            datasets: [
                { label: 'Your Hotel', data: [{x: 140, y: 8.8, r: 10}], backgroundColor: 'rgba(99, 102, 241, 0.7)', borderColor: 'rgba(99, 102, 241, 1)', borderWidth: 3 },
                { label: 'Competitor A', data: [{x: 130, y: 8.5, r: 8}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 },
                { label: 'Competitor B', data: [{x: 160, y: 9.3, r: 12}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 },
                { label: 'Competitor C', data: [{x: 100, y: 7.6, r: 7}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 },
                { label: 'Competitor D', data: [{x: 80, y: 7.2, r: 6}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 }
            ]
        },
        {
            datasets: [
                { label: 'Your Hotel', data: [{x: 135, y: 8.7, r: 10}], backgroundColor: 'rgba(99, 102, 241, 0.7)', borderColor: 'rgba(99, 102, 241, 1)', borderWidth: 3 },
                { label: 'Competitor A', data: [{x: 115, y: 8.3, r: 8}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 },
                { label: 'Competitor B', data: [{x: 155, y: 9.2, r: 12}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 },
                { label: 'Competitor C', data: [{x: 105, y: 7.9, r: 7}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 },
                { label: 'Competitor D', data: [{x: 90, y: 7.4, r: 6}], backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgba(236, 72, 153, 0.8)', borderWidth: 2 }
            ]
        }
    ];
    
    let currentScenario = 0;
    
    // Calculate averages
    const avgPrice = 118;
    const qualityThreshold = 7.9;
    
    demoChart = new Chart(ctx, {
        type: 'bubble',
        data: scenarios[0],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return [
                                `${context.dataset.label}`,
                                `Price: €${context.parsed.x}`,
                                `Rating: ${context.parsed.y.toFixed(1)}`
                            ];
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8
                },
                annotation: {
                    annotations: {
                        verticalLine: {
                            type: 'line',
                            xMin: avgPrice,
                            xMax: avgPrice,
                            borderColor: 'rgba(255, 255, 255, 0.6)',
                            borderWidth: 2,
                            borderDash: [10, 5]
                        },
                        horizontalLine: {
                            type: 'line',
                            yMin: qualityThreshold,
                            yMax: qualityThreshold,
                            borderColor: 'rgba(255, 255, 255, 0.6)',
                            borderWidth: 2,
                            borderDash: [10, 5]
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Price (€)',
                        font: { size: 12, weight: 'bold' },
                        color: 'rgba(255, 255, 255, 0.9)'
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.8)' },
                    min: 60,
                    max: 180
                },
                y: {
                    title: {
                        display: true,
                        text: 'Rating',
                        font: { size: 12, weight: 'bold' },
                        color: 'rgba(255, 255, 255, 0.9)'
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.8)' },
                    min: 7,
                    max: 10
                }
            }
        }
    });
    
    // Animate through scenarios every 6 seconds
    demoAnimationInterval = setInterval(() => {
        currentScenario = (currentScenario + 1) % scenarios.length;
        demoChart.data = scenarios[currentScenario];
        demoChart.update();
    }, 6000);
}

// ============================================
// CUSTOMER PERCEPTION ANALYSIS
// ============================================
function analyzeCustomerPerception(hotel, avgPrice, qualityThreshold, ratingScale) {
    const price = Object.values(hotel.prices).filter(p => p > 0)
        .reduce((sum, p) => sum + p, 0) / Object.values(hotel.prices).filter(p => p > 0).length;
    
    const isExpensive = price > avgPrice;
    const isQuality = hotel.rating >= qualityThreshold;
    const hasCredibility = hotel.reviews >= 50;
    
    let perception = '';
    
    if (isQuality && isExpensive) {
        perception = 'premium';
    } else if (isQuality && !isExpensive) {
        perception = 'value_leader';
    } else if (!isQuality && isExpensive) {
        if (!hasCredibility) {
            perception = 'underrated_expensive';
        } else {
            perception = 'overpriced';
        }
    } else {
        if (!hasCredibility) {
            perception = 'underrated_cheap';
        } else {
            perception = 'budget';
        }
    }
    
    return translations[currentLanguage].perception[perception];
}

// ============================================
// LANGUAGE MANAGEMENT
// ============================================
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update dropdown
    document.getElementById('langDropdown').value = lang;
    
    // Update all translatable elements
    updateTranslations();
    
    // Save preference
    localStorage.setItem('mariting_language', lang);
}

function updateTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations[currentLanguage], key);
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
}

// ============================================
// TEMPLATE DOWNLOAD
// ============================================
function downloadTemplate() {
    const templateData = generateTemplateData(currentLanguage);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const ws = XLSX.utils.aoa_to_sheet(templateData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Hotel Analysis');
    
    // Generate Excel file and download
    XLSX.writeFile(wb, `mariting_template_${currentLanguage}.xlsx`);
    
    showNotification(translations[currentLanguage].alerts.file_uploaded, 'success');
}

function generateTemplateData(lang) {
    const templates = {
        en: [
            ['MARITING - HOTEL COMPETITION ANALYSIS TEMPLATE', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['Platform:', '(e.g. Booking, Airbnb, Expedia, Google Hotels, TripAdvisor, Trivago)', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['SINGLE ROOMS PRICING ANALYSIS', '', '', '', '', '', '', '', '', ''],
            ['Hotel Name', 'Rating', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Reviews Num'],
            ['[My Main Hotel]', 8.5, '€85', '€85', '€85', '€95', '€120', '€130', '€110', 465],
            ['Competitor Hotel 1', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 2', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 3', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 4', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 5', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 6', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 7', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['DOUBLE ROOMS PRICING ANALYSIS', '', '', '', '', '', '', '', '', ''],
            ['Hotel Name', 'Rating', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Reviews Num'],
            ['[My Main Hotel]', 8.5, '€120', '€120', '€120', '€135', '€160', '€170', '€145', 465],
            ['Competitor Hotel 1', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 2', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 3', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 4', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 5', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 6', '', '', '', '', '', '', '', '', ''],
            ['Competitor Hotel 7', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['Contact: support@mariting.com', '', '', '', '', '', '', '', '', '']
        ],
        es: [
            ['MARITING - PLANTILLA DE ANÁLISIS DE COMPETENCIA HOTELERA', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['Plataforma:', '(ej. Booking, Airbnb, Expedia, Google Hotels, TripAdvisor, Trivago)', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['ANÁLISIS DE PRECIOS HABITACIONES INDIVIDUALES', '', '', '', '', '', '', '', '', ''],
            ['Nombre del Hotel', 'Calificación', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Núm. Reseñas'],
            ['[Mi Hotel Principal]', 8.5, '€85', '€85', '€85', '€95', '€120', '€130', '€110', 465],
            ['Hotel Competidor 1', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 2', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 3', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 4', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 5', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 6', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 7', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['ANÁLISIS DE PRECIOS HABITACIONES DOBLES', '', '', '', '', '', '', '', '', ''],
            ['Nombre del Hotel', 'Calificación', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Núm. Reseñas'],
            ['[Mi Hotel Principal]', 8.5, '€120', '€120', '€120', '€135', '€160', '€170', '€145', 465],
            ['Hotel Competidor 1', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 2', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 3', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 4', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 5', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 6', '', '', '', '', '', '', '', '', ''],
            ['Hotel Competidor 7', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['Contacto: support@mariting.com', '', '', '', '', '', '', '', '', '']
        ],
        de: [
            ['MARITING - HOTEL WETTBEWERBS ANALYSE VORLAGE', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['Plattform:', '(z.B. Booking, Airbnb, Expedia, Google Hotels, TripAdvisor, Trivago)', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['EINZELZIMMER PREISANALYSE', '', '', '', '', '', '', '', '', ''],
            ['Hotelname', 'Bewertung', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag', 'Anz. Bewertungen'],
            ['[Mein Haupthotel]', 8.5, '€85', '€85', '€85', '€95', '€120', '€130', '€110', 465],
            ['Konkurrenz Hotel 1', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 2', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 3', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 4', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 5', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 6', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 7', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['DOPPELZIMMER PREISANALYSE', '', '', '', '', '', '', '', '', ''],
            ['Hotelname', 'Bewertung', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag', 'Anz. Bewertungen'],
            ['[Mein Haupthotel]', 8.5, '€120', '€120', '€120', '€135', '€160', '€170', '€145', 465],
            ['Konkurrenz Hotel 1', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 2', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 3', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 4', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 5', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 6', '', '', '', '', '', '', '', '', ''],
            ['Konkurrenz Hotel 7', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['Kontakt: support@mariting.com', '', '', '', '', '', '', '', '', '']
        ]
    };
    
    return templates[lang];
}

// ============================================
// PLATFORM DETECTION
// ============================================
function detectPlatform(platformText) {
    if (!platformText) return { name: 'Unknown', logo: null, scale: 10 };
    
    const text = platformText.toLowerCase().trim();
    
    if (text.includes('booking')) {
        return { name: 'Booking', logo: platformLogos.booking, scale: 10 };
    } else if (text.includes('airbnb')) {
        return { name: 'Airbnb', logo: platformLogos.airbnb, scale: 5 };
    } else if (text.includes('expedia')) {
        return { name: 'Expedia', logo: platformLogos.expedia, scale: 5 };
    } else if (text.includes('google')) {
        return { name: 'Google Hotels', logo: platformLogos.google, scale: 5 };
    } else if (text.includes('tripadvisor')) {
        return { name: 'TripAdvisor', logo: platformLogos.tripadvisor, scale: 5 };
    } else if (text.includes('trivago')) {
        return { name: 'Trivago', logo: platformLogos.trivago, scale: 10 };
    }
    
    return { name: platformText, logo: null, scale: 10 };
}

// ============================================
// FILE HANDLING
// ============================================
function setupDragDrop() {
    const dropZone = document.getElementById('dropZone');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('dragover');
        }, false);
    });
    
    dropZone.addEventListener('drop', handleDrop, false);
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    const fileName = file.name;
    const fileExt = fileName.split('.').pop().toLowerCase();
    
    document.getElementById('fileName').textContent = fileName;
    document.getElementById('fileName').classList.remove('hidden');
    
    if (fileExt === 'csv') {
        parseCSV(file);
    } else if (fileExt === 'xlsx' || fileExt === 'xls') {
        parseExcel(file);
    } else {
        showNotification('Please upload a CSV or Excel file', 'error');
    }
}

function parseCSV(file) {
    Papa.parse(file, {
        complete: function(results) {
            processData(results.data);
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
            showNotification(translations[currentLanguage].alerts.error, 'error');
        }
    });
}

function parseExcel(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            processData(jsonData);
        } catch (error) {
            console.error('Error parsing Excel:', error);
            showNotification(translations[currentLanguage].alerts.error, 'error');
        }
    };
    
    reader.readAsArrayBuffer(file);
}

function processData(data) {
    try {
        // Find platform information
        let platform = 'Booking.com'; // Default
        for (let i = 0; i < Math.min(5, data.length); i++) {
            const row = data[i];
            if (row[0] && row[0].toLowerCase().includes('platform')) {
                platform = row[1] || 'Booking.com';
                break;
            }
        }
        
        // Find sections
        let singleStartIdx = -1;
        let doubleStartIdx = -1;
        
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            const firstCell = row[0] ? row[0].toString().toLowerCase() : '';
            
            if (firstCell.includes('single')) {
                singleStartIdx = i + 2; // Skip header row
            } else if (firstCell.includes('double')) {
                doubleStartIdx = i + 2; // Skip header row
            }
        }
        
        // Parse hotel data
        const singleRooms = parseHotelSection(data, singleStartIdx);
        const doubleRooms = parseHotelSection(data, doubleStartIdx);
        
        uploadedData = {
            platform: platform,
            platformInfo: detectPlatform(platform),
            single: singleRooms,
            double: doubleRooms
        };
        
        // Show analysis options
        document.getElementById('analysisOptions').classList.remove('hidden');
        showNotification(translations[currentLanguage].alerts.file_uploaded, 'success');
        
    } catch (error) {
        console.error('Error processing data:', error);
        showNotification(translations[currentLanguage].alerts.error, 'error');
    }
}

function parseHotelSection(data, startIdx) {
    const hotels = [];
    
    if (startIdx === -1) return hotels;
    
    for (let i = startIdx; i < data.length; i++) {
        const row = data[i];
        
        // Stop if we hit an empty row or another section
        if (!row[0] || row[0].toString().trim() === '') break;
        
        const hotelName = row[0].toString().trim();
        const isMainHotel = hotelName.includes('[') && hotelName.includes(']');
        const cleanName = hotelName.replace(/[\[\]]/g, '');
        
        const rating = parseFloat(row[1]) || 0;
        const prices = {
            Monday: parsePrice(row[2]),
            Tuesday: parsePrice(row[3]),
            Wednesday: parsePrice(row[4]),
            Thursday: parsePrice(row[5]),
            Friday: parsePrice(row[6]),
            Saturday: parsePrice(row[7]),
            Sunday: parsePrice(row[8])
        };
        const reviews = parseInt(row[9]) || 0;
        
        // Only add if has valid data
        if (rating > 0 && Object.values(prices).some(p => p > 0)) {
            hotels.push({
                name: cleanName,
                isMain: isMainHotel,
                rating: rating,
                prices: prices,
                reviews: reviews
            });
        }
    }
    
    return hotels;
}

function parsePrice(value) {
    if (!value) return 0;
    const priceStr = value.toString().replace(/[€$£,]/g, '').trim();
    const price = parseFloat(priceStr);
    return isNaN(price) ? 0 : price;
}

// ============================================
// UI INTERACTIONS
// ============================================
function toggleOption(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.checked = !checkbox.checked;
    
    // Handle special cases
    if (checkboxId === 'dayAll') {
        document.getElementById('daySpecific').checked = false;
        document.getElementById('daySelector').classList.add('hidden');
    } else if (checkboxId === 'daySpecific') {
        document.getElementById('dayAll').checked = false;
        document.getElementById('daySelector').classList.remove('hidden');
    }
    
    // Update UI
    const card = checkbox.closest('.option-card');
    if (checkbox.checked) {
        card.classList.add('selected');
    } else {
        card.classList.remove('selected');
    }
}

// ============================================
// CHART GENERATION (ADAPTIVE SCALE)
// ============================================
function generateAnalysis() {
    if (!uploadedData) {
        showNotification('Please upload data first', 'error');
        return;
    }
    
    // Get selected options
    const roomSingle = document.getElementById('roomSingle').checked;
    const roomDouble = document.getElementById('roomDouble').checked;
    const allDays = document.getElementById('dayAll').checked;
    const specificDay = document.getElementById('daySpecific').checked;
    
    if (!roomSingle && !roomDouble) {
        showNotification(translations[currentLanguage].alerts.select_room, 'error');
        return;
    }
    
    if (!allDays && !specificDay) {
        showNotification(translations[currentLanguage].alerts.select_day, 'error');
        return;
    }
    
    // Show loader
    document.getElementById('loader').classList.add('active');
    
    // Clear previous charts
    document.getElementById('chartsContainer').innerHTML = '';
    charts.forEach(chart => chart.destroy());
    charts = [];
    
    setTimeout(() => {
        const days = allDays 
            ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            : [document.getElementById('specificDay').value];
        
        if (roomSingle) {
            days.forEach(day => {
                createChart(uploadedData.single, 'Single', day);
            });
        }
        
        if (roomDouble) {
            days.forEach(day => {
                createChart(uploadedData.double, 'Double', day);
            });
        }
        
        // Hide loader, show AI analysis button
        document.getElementById('loader').classList.remove('active');
        document.getElementById('aiAnalysisSection').classList.remove('hidden');
        
        // Smooth scroll to charts
        document.getElementById('chartsContainer').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 800);
}

function createChart(hotels, roomType, day) {
    if (!hotels || hotels.length === 0) return;
    
    // Filter hotels with valid prices for this day
    const validHotels = hotels.filter(h => h.prices[day] > 0);
    
    if (validHotels.length === 0) return;
    
    // Calculate average price for crosshair
    const avgPrice = validHotels.reduce((sum, h) => sum + h.prices[day], 0) / validHotels.length;
    
    // ADAPTIVE SCALE: Find min and max ratings from actual data
    const ratings = validHotels.map(h => h.rating);
    const minRating = Math.min(...ratings);
    const maxRating = Math.max(...ratings);
    
    // Add some padding (10% on each side)
    const ratingPadding = (maxRating - minRating) * 0.1;
    const yMin = Math.max(0, minRating - ratingPadding);
    const yMax = maxRating + ratingPadding;
    
    // Quality threshold (7.9 for 10-scale, 3.9 for 5-scale)
    const ratingScale = uploadedData.platformInfo.scale;
    const qualityThreshold = ratingScale === 10 ? 7.9 : 3.9;
    
    // Find main hotel
    const mainHotel = validHotels.find(h => h.isMain);
    
    // Prepare chart data with smaller bubble sizes
    const datasets = validHotels.map(hotel => ({
        label: hotel.name,
        data: [{
            x: hotel.prices[day],
            y: hotel.rating,
            r: Math.sqrt(hotel.reviews) / 3 + 3
        }],
        backgroundColor: hotel.isMain 
            ? 'rgba(99, 102, 241, 0.7)' 
            : 'rgba(236, 72, 153, 0.5)',
        borderColor: hotel.isMain 
            ? 'rgba(99, 102, 241, 1)' 
            : 'rgba(236, 72, 153, 0.8)',
        borderWidth: hotel.isMain ? 3 : 2,
    }));
    
    // Create container
    const container = document.createElement('div');
    container.className = 'chart-container';
    
    // Get customer perception if main hotel exists
    const perception = mainHotel ? analyzeCustomerPerception(mainHotel, avgPrice, qualityThreshold, ratingScale) : '';
    
    container.innerHTML = `
        <div class="chart-header">
            <div class="chart-title-section">
                <h3>${roomType} Room - ${day}</h3>
            </div>
            <div class="chart-actions">
                ${uploadedData.platformInfo.logo ? `<img src="${uploadedData.platformInfo.logo}" alt="${uploadedData.platformInfo.name}" class="platform-logo">` : ''}
                <button class="btn" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="downloadChart('${roomType}_${day}')">
                    <span class="download-icon">⬇</span> Download
                </button>
            </div>
        </div>
        <div class="chart-wrapper">
            <canvas id="chart_${roomType}_${day}"></canvas>
        </div>
        <div class="chart-insight">
            <h4>${translations[currentLanguage].chart.platform}: ${uploadedData.platformInfo.name}</h4>
            <p><strong>Customer Perception:</strong> ${perception}</p>
        </div>
    `;
    
    document.getElementById('chartsContainer').appendChild(container);
    
    // Create chart with adaptive scale
    const ctx = document.getElementById(`chart_${roomType}_${day}`).getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bubble',
        data: { datasets: datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 12, family: 'Inter' },
                        usePointStyle: true,
                        generateLabels: function(chart) {
                            const datasets = chart.data.datasets;
                            return datasets.map((dataset, i) => ({
                                text: dataset.label,
                                fillStyle: dataset.backgroundColor,
                                strokeStyle: dataset.borderColor,
                                lineWidth: dataset.borderWidth,
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const hotel = validHotels[context.datasetIndex];
                            return [
                                `Hotel: ${hotel.name}`,
                                `Price: €${context.parsed.x.toFixed(2)}`,
                                `Rating: ${context.parsed.y.toFixed(1)}`,
                                `Reviews: ${hotel.reviews}`
                            ];
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    cornerRadius: 8
                },
                annotation: {
                    annotations: {
                        verticalLine: {
                            type: 'line',
                            xMin: avgPrice,
                            xMax: avgPrice,
                            borderColor: 'rgba(99, 102, 241, 0.5)',
                            borderWidth: 2,
                            borderDash: [10, 5],
                            label: {
                                display: true,
                                content: 'Avg Price',
                                position: 'start',
                                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                                color: 'white',
                                font: { size: 11 }
                            }
                        },
                        horizontalLine: {
                            type: 'line',
                            yMin: qualityThreshold,
                            yMax: qualityThreshold,
                            borderColor: 'rgba(236, 72, 153, 0.5)',
                            borderWidth: 2,
                            borderDash: [10, 5],
                            label: {
                                display: true,
                                content: 'Quality',
                                position: 'start',
                                backgroundColor: 'rgba(236, 72, 153, 0.8)',
                                color: 'white',
                                font: { size: 11 }
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: translations[currentLanguage].chart.price,
                        font: { size: 14, weight: 'bold', family: 'Inter' }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                y: {
                    title: {
                        display: true,
                        text: translations[currentLanguage].chart.rating,
                        font: { size: 14, weight: 'bold', family: 'Inter' }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    min: yMin,  // ADAPTIVE
                    max: yMax   // ADAPTIVE
                }
            }
        }
    });
    
    charts.push(chart);
}

function downloadChart(chartId) {
    const canvas = document.getElementById(`chart_${chartId}`);
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `mariting_${chartId}.png`;
    link.href = url;
    link.click();
}

// ============================================
// AI ANALYSIS (FREE - NO RESTRICTIONS)
// ============================================
function openAIAnalysis() {
    // Always open the analysis - NO authentication required
    document.getElementById('aiModal').classList.add('active');
    performAIAnalysis();
}

function closeAIModal() {
    document.getElementById('aiModal').classList.remove('active');
}

function performAIAnalysis() {
    setTimeout(() => {
        const analysis = generateAIAnalysis();
        displayAIAnalysis(analysis);
    }, 2000);
}

function generateAIAnalysis() {
    if (!uploadedData) return null;
    
    // Get main hotel from both room types
    const mainHotelSingle = uploadedData.single?.find(h => h.isMain);
    const mainHotelDouble = uploadedData.double?.find(h => h.isMain);
    
    if (!mainHotelSingle && !mainHotelDouble) return null;
    
    const mainHotel = mainHotelSingle || mainHotelDouble;
    const hasBoothRoomTypes = mainHotelSingle && mainHotelDouble;
    
    // Calculate averages for Singles
    const singleHotels = uploadedData.single || [];
    const singleAvgPrice = singleHotels.length > 0 ? 
        singleHotels.reduce((sum, h) => {
            const prices = Object.values(h.prices).filter(p => p > 0);
            return sum + (prices.reduce((s, p) => s + p, 0) / prices.length);
        }, 0) / singleHotels.length : 0;
    
    const singleAvgRating = singleHotels.length > 0 ?
        singleHotels.reduce((sum, h) => sum + h.rating, 0) / singleHotels.length : 0;
    
    // Calculate averages for Doubles
    const doubleHotels = uploadedData.double || [];
    const doubleAvgPrice = doubleHotels.length > 0 ?
        doubleHotels.reduce((sum, h) => {
            const prices = Object.values(h.prices).filter(p => p > 0);
            return sum + (prices.reduce((s, p) => s + p, 0) / prices.length);
        }, 0) / doubleHotels.length : 0;
    
    const doubleAvgRating = doubleHotels.length > 0 ?
        doubleHotels.reduce((sum, h) => sum + h.rating, 0) / doubleHotels.length : 0;
    
    const qualityThreshold = uploadedData.platformInfo.scale === 10 ? 8.0 : 4.0;
    
    // Main hotel prices
    const mainSinglePrice = mainHotelSingle ? 
        Object.values(mainHotelSingle.prices).filter(p => p > 0)
            .reduce((sum, p) => sum + p, 0) / Object.values(mainHotelSingle.prices).filter(p => p > 0).length : 0;
    
    const mainDoublePrice = mainHotelDouble ?
        Object.values(mainHotelDouble.prices).filter(p => p > 0)
            .reduce((sum, p) => sum + p, 0) / Object.values(mainHotelDouble.prices).filter(p => p > 0).length : 0;
    
    return {
        mainHotel: mainHotel.name,
        reviews: mainHotel.reviews,
        platform: uploadedData.platformInfo.name,
        scale: uploadedData.platformInfo.scale,
        qualityThreshold: qualityThreshold,
        
        // Single room data
        hasSingle: !!mainHotelSingle,
        singleRating: mainHotelSingle?.rating || 0,
        singlePrice: mainSinglePrice,
        singleMarketAvgPrice: singleAvgPrice,
        singleMarketAvgRating: singleAvgRating,
        singleCompetitors: singleHotels.filter(h => !h.isMain),
        
        // Double room data
        hasDouble: !!mainHotelDouble,
        doubleRating: mainHotelDouble?.rating || 0,
        doublePrice: mainDoublePrice,
        doubleMarketAvgPrice: doubleAvgPrice,
        doubleMarketAvgRating: doubleAvgRating,
        doubleCompetitors: doubleHotels.filter(h => !h.isMain),
        
        // Both room types
        hasBothRoomTypes: hasBoothRoomTypes,
        ratingDiscrepancy: hasBoothRoomTypes ? Math.abs(mainHotelSingle.rating - mainHotelDouble.rating) : 0
    };
}

function displayAIAnalysis(analysis) {
    if (!analysis) {
        document.getElementById('aiAnalysisContent').innerHTML = `
            <p style="text-align: center; color: var(--gray);">No data available for analysis</p>
        `;
        return;
    }
    
    // Generate analysis sections
    const priceRatingAnalysis = generatePriceRatingAnalysis(analysis);
    const revenueOpportunity = generateRevenueOpportunity(analysis);
    const competitiveThreats = generateCompetitiveThreats(analysis);
    const rootCauseAnalysis = analysis.hasBothRoomTypes && analysis.ratingDiscrepancy >= 0.5 ? 
        generateRootCauseAnalysis(analysis) : '';
    
    const html = `
        <div class="analysis-section">
            <h3>📊 Current Market Position</h3>
            <div class="insight-card">
                <p><strong>Your Hotel:</strong> ${analysis.mainHotel}</p>
                <p><strong>Platform:</strong> ${analysis.platform}</p>
                <p><strong>Total Reviews:</strong> ${analysis.reviews}</p>
                ${analysis.hasSingle ? `<p><strong>Single Room Rating:</strong> ${analysis.singleRating.toFixed(1)}/${analysis.scale} | Avg Price: €${analysis.singlePrice.toFixed(0)}</p>` : ''}
                ${analysis.hasDouble ? `<p><strong>Double Room Rating:</strong> ${analysis.doubleRating.toFixed(1)}/${analysis.scale} | Avg Price: €${analysis.doublePrice.toFixed(0)}</p>` : ''}
            </div>
        </div>
        
        ${priceRatingAnalysis}
        ${revenueOpportunity}
        ${competitiveThreats}
        ${rootCauseAnalysis}
        
        <div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, var(--primary), var(--primary-dark)); border-radius: 12px; color: white;">
            <p style="margin: 0; font-size: 0.9rem;">
                💡 This analysis provides actionable insights based on your competitive data. For more detailed strategic consulting, contact our premium services.
            </p>
        </div>
    `;
    
    document.getElementById('aiAnalysisContent').innerHTML = html;
}

function generatePriceRatingAnalysis(analysis) {
    let html = '<div class="analysis-section"><h3>🎯 Price-Rating Analysis</h3>';
    
    // Analyze Single rooms if available
    if (analysis.hasSingle && analysis.singleCompetitors.length > 0) {
        html += '<h4 style="color: var(--dark); font-size: 1.1rem; margin-top: 1rem;">Single Rooms:</h4>';
        
        // Sort competitors by rating
        const sortedSingle = [...analysis.singleCompetitors]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3); // Top 3
        
        sortedSingle.forEach(comp => {
            const compPrice = Object.values(comp.prices).filter(p => p > 0)
                .reduce((sum, p) => sum + p, 0) / Object.values(comp.prices).filter(p => p > 0).length;
            const priceDiff = compPrice - analysis.singlePrice;
            const ratingDiff = comp.rating - analysis.singleRating;
            
            let insight = '';
            if (comp.rating > analysis.qualityThreshold && compPrice > analysis.singlePrice) {
                insight = 'Premium positioning justified';
            } else if (comp.rating > analysis.singleRating && compPrice < analysis.singlePrice) {
                insight = `⚠️ Better rating at lower price (-€${Math.abs(priceDiff).toFixed(0)})`;
            } else if (comp.rating < analysis.singleRating && compPrice > analysis.singlePrice) {
                insight = 'You offer better value';
            }
            
            html += `<div class="insight-card">
                <p><strong>${comp.name}</strong> (${comp.rating.toFixed(1)}): €${compPrice.toFixed(0)} - ${insight}</p>
            </div>`;
        });
        
        // Your hotel assessment
        const isPriceJustified = analysis.singleRating >= analysis.qualityThreshold;
        const vsMarket = analysis.singlePrice > analysis.singleMarketAvgPrice ? 'above' : 'below';
        html += `<div class="insight-card" style="background: ${isPriceJustified ? '#E8F5E9' : '#FFF3E0'}; border-left: 4px solid ${isPriceJustified ? '#4CAF50' : '#FF9800'};">
            <p><strong>YOUR HOTEL (${analysis.singleRating.toFixed(1)}):</strong> €${analysis.singlePrice.toFixed(0)} - ${isPriceJustified ? '✅ Price justified by rating' : '⚠️ Consider rating improvement'} (${vsMarket} market avg €${analysis.singleMarketAvgPrice.toFixed(0)})</p>
        </div>`;
    }
    
    // Analyze Double rooms if available
    if (analysis.hasDouble && analysis.doubleCompetitors.length > 0) {
        html += '<h4 style="color: var(--dark); font-size: 1.1rem; margin-top: 1.5rem;">Double Rooms:</h4>';
        
        const sortedDouble = [...analysis.doubleCompetitors]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
        
        sortedDouble.forEach(comp => {
            const compPrice = Object.values(comp.prices).filter(p => p > 0)
                .reduce((sum, p) => sum + p, 0) / Object.values(comp.prices).filter(p => p > 0).length;
            const priceDiff = compPrice - analysis.doublePrice;
            
            let insight = '';
            if (comp.rating > analysis.qualityThreshold && compPrice > analysis.doublePrice) {
                insight = 'Premium positioning justified';
            } else if (comp.rating > analysis.doubleRating && compPrice < analysis.doublePrice) {
                insight = `⚠️ Better rating at lower price (-€${Math.abs(priceDiff).toFixed(0)})`;
            } else if (comp.rating < analysis.doubleRating && compPrice > analysis.doublePrice) {
                insight = 'You offer better value';
            }
            
            html += `<div class="insight-card">
                <p><strong>${comp.name}</strong> (${comp.rating.toFixed(1)}): €${compPrice.toFixed(0)} - ${insight}</p>
            </div>`;
        });
        
        const isPriceJustified = analysis.doubleRating >= analysis.qualityThreshold;
        const vsMarket = analysis.doublePrice > analysis.doubleMarketAvgPrice ? 'above' : 'below';
        html += `<div class="insight-card" style="background: ${isPriceJustified ? '#E8F5E9' : '#FFF3E0'}; border-left: 4px solid ${isPriceJustified ? '#4CAF50' : '#FF9800'};">
            <p><strong>YOUR HOTEL (${analysis.doubleRating.toFixed(1)}):</strong> €${analysis.doublePrice.toFixed(0)} - ${isPriceJustified ? '✅ Price justified by rating' : '⚠️ Consider rating improvement'} (${vsMarket} market avg €${analysis.doubleMarketAvgPrice.toFixed(0)})</p>
        </div>`;
    }
    
    html += '</div>';
    return html;
}

function generateRevenueOpportunity(analysis) {
    let html = '<div class="analysis-section"><h3>💰 Revenue Opportunity</h3>';
    
    const pricePerRatingPoint = 10; // €10-15 per 0.1 rating point above threshold
    
    // Singles analysis
    if (analysis.hasSingle) {
        const optimalSinglePrice = analysis.singleRating >= analysis.qualityThreshold ?
            analysis.singleMarketAvgPrice + ((analysis.singleRating - analysis.qualityThreshold) * pricePerRatingPoint * 10) :
            analysis.singleMarketAvgPrice * (analysis.singleRating / analysis.qualityThreshold) * 0.9;
        
        const priceDiff = optimalSinglePrice - analysis.singlePrice;
        const percentChange = (priceDiff / analysis.singlePrice * 100);
        
        if (Math.abs(priceDiff) > 5) {
            html += `<div class="insight-card" style="background: ${priceDiff > 0 ? '#E8F5E9' : '#FFF3E0'};">
                <p><strong>Single Rooms:</strong> With rating ${analysis.singleRating.toFixed(1)}, optimal price is <strong>€${optimalSinglePrice.toFixed(0)}</strong></p>
                <p>Current: €${analysis.singlePrice.toFixed(0)} → Suggested: €${optimalSinglePrice.toFixed(0)} (<strong>${priceDiff > 0 ? '+' : ''}€${priceDiff.toFixed(0)}/night</strong>, ${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%)</p>
                <p style="font-size: 0.9rem; color: var(--gray); margin-top: 0.5rem;">💡 Annual impact (50% occupancy): ${priceDiff > 0 ? '+' : ''}€${(priceDiff * 182.5).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            </div>`;
        } else {
            html += `<div class="insight-card" style="background: #E8F5E9;">
                <p><strong>Single Rooms:</strong> ✅ Current price (€${analysis.singlePrice.toFixed(0)}) is well-optimized for rating ${analysis.singleRating.toFixed(1)}</p>
            </div>`;
        }
    }
    
    // Doubles analysis
    if (analysis.hasDouble) {
        const optimalDoublePrice = analysis.doubleRating >= analysis.qualityThreshold ?
            analysis.doubleMarketAvgPrice + ((analysis.doubleRating - analysis.qualityThreshold) * pricePerRatingPoint * 10) :
            analysis.doubleMarketAvgPrice * (analysis.doubleRating / analysis.qualityThreshold) * 0.9;
        
        const priceDiff = optimalDoublePrice - analysis.doublePrice;
        const percentChange = (priceDiff / analysis.doublePrice * 100);
        
        if (Math.abs(priceDiff) > 5) {
            html += `<div class="insight-card" style="background: ${priceDiff > 0 ? '#E8F5E9' : '#FFF3E0'};">
                <p><strong>Double Rooms:</strong> With rating ${analysis.doubleRating.toFixed(1)}, optimal price is <strong>€${optimalDoublePrice.toFixed(0)}</strong></p>
                <p>Current: €${analysis.doublePrice.toFixed(0)} → Suggested: €${optimalDoublePrice.toFixed(0)} (<strong>${priceDiff > 0 ? '+' : ''}€${priceDiff.toFixed(0)}/night</strong>, ${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%)</p>
                <p style="font-size: 0.9rem; color: var(--gray); margin-top: 0.5rem;">💡 Annual impact (50% occupancy): ${priceDiff > 0 ? '+' : ''}€${(priceDiff * 182.5).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            </div>`;
        } else {
            html += `<div class="insight-card" style="background: #E8F5E9;">
                <p><strong>Double Rooms:</strong> ✅ Current price (€${analysis.doublePrice.toFixed(0)}) is well-optimized for rating ${analysis.doubleRating.toFixed(1)}</p>
            </div>`;
        }
    }
    
    html += '</div>';
    return html;
}

function generateCompetitiveThreats(analysis) {
    let html = '<div class="analysis-section"><h3>🚨 Competitive Threats</h3>';
    
    let threatsFound = false;
    
    // Singles threats
    if (analysis.hasSingle && analysis.singleCompetitors.length > 0) {
        const threats = analysis.singleCompetitors.filter(comp => {
            const compPrice = Object.values(comp.prices).filter(p => p > 0)
                .reduce((sum, p) => sum + p, 0) / Object.values(comp.prices).filter(p => p > 0).length;
            return comp.rating > analysis.singleRating && compPrice <= analysis.singlePrice;
        }).sort((a, b) => b.rating - a.rating);
        
        if (threats.length > 0) {
            threatsFound = true;
            html += '<h4 style="color: var(--danger); font-size: 1.1rem; margin-top: 1rem;">⚠️ Single Rooms:</h4>';
            
            threats.slice(0, 2).forEach(threat => {
                const compPrice = Object.values(threat.prices).filter(p => p > 0)
                    .reduce((sum, p) => sum + p, 0) / Object.values(threat.prices).filter(p => p > 0).length;
                const priceDiff = ((analysis.singlePrice - compPrice) / compPrice * 100);
                const ratingDiff = threat.rating - analysis.singleRating;
                
                html += `<div class="insight-card" style="background: #FFEBEE; border-left: 4px solid #F44336;">
                    <p><strong>${threat.name}</strong> (${threat.rating.toFixed(1)}) offers BETTER rating (+${ratingDiff.toFixed(1)}) at ${compPrice < analysis.singlePrice ? 'LOWER' : 'SAME'} price (€${compPrice.toFixed(0)} vs your €${analysis.singlePrice.toFixed(0)})</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">🎯 Risk: Losing price-sensitive customers seeking quality</p>
                </div>`;
            });
        }
    }
    
    // Doubles threats
    if (analysis.hasDouble && analysis.doubleCompetitors.length > 0) {
        const threats = analysis.doubleCompetitors.filter(comp => {
            const compPrice = Object.values(comp.prices).filter(p => p > 0)
                .reduce((sum, p) => sum + p, 0) / Object.values(comp.prices).filter(p => p > 0).length;
            return comp.rating > analysis.doubleRating && compPrice <= analysis.doublePrice;
        }).sort((a, b) => b.rating - a.rating);
        
        if (threats.length > 0) {
            threatsFound = true;
            html += '<h4 style="color: var(--danger); font-size: 1.1rem; margin-top: 1.5rem;">⚠️ Double Rooms:</h4>';
            
            threats.slice(0, 2).forEach(threat => {
                const compPrice = Object.values(threat.prices).filter(p => p > 0)
                    .reduce((sum, p) => sum + p, 0) / Object.values(threat.prices).filter(p => p > 0).length;
                const priceDiff = ((analysis.doublePrice - compPrice) / compPrice * 100);
                const ratingDiff = threat.rating - analysis.doubleRating;
                
                html += `<div class="insight-card" style="background: #FFEBEE; border-left: 4px solid #F44336;">
                    <p><strong>${threat.name}</strong> (${threat.rating.toFixed(1)}) offers BETTER rating (+${ratingDiff.toFixed(1)}) at ${compPrice < analysis.doublePrice ? 'LOWER' : 'SAME'} price (€${compPrice.toFixed(0)} vs your €${analysis.doublePrice.toFixed(0)})</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">🎯 Risk: Losing price-sensitive customers seeking quality</p>
                </div>`;
            });
        }
    }
    
    if (!threatsFound) {
        html += `<div class="insight-card" style="background: #E8F5E9; border-left: 4px solid #4CAF50;">
            <p>✅ <strong>Strong Position:</strong> No immediate competitive threats detected. Your pricing and rating combination is competitive.</p>
        </div>`;
    }
    
    html += '</div>';
    return html;
}

function generateRootCauseAnalysis(analysis) {
    const higherRating = analysis.singleRating > analysis.doubleRating ? 'Single' : 'Double';
    const lowerRating = analysis.singleRating > analysis.doubleRating ? 'Double' : 'Single';
    const ratingGap = Math.abs(analysis.singleRating - analysis.doubleRating);
    
    return `
        <div class="analysis-section">
            <h3>❓ Root Cause Analysis</h3>
            <div class="insight-card" style="background: #FFF9C4; border-left: 4px solid #FBC02D;">
                <p><strong>Rating Discrepancy Detected:</strong></p>
                <p>Single Rooms: ${analysis.singleRating.toFixed(1)} vs Double Rooms: ${analysis.doubleRating.toFixed(1)} (Δ ${ratingGap.toFixed(1)} points)</p>
                <p style="margin-top: 1rem;"><strong>Possible reasons for different ratings:</strong></p>
                <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>${higherRating} rooms may have better renovation/condition</li>
                    <li>${lowerRating} rooms might be smaller or have fewer amenities</li>
                    <li>Different guest expectations for each room type</li>
                    <li>Location/view differences within the property</li>
                </ul>
                <p style="margin-top: 1rem;"><strong>🔍 Recommended Action:</strong></p>
                <p>Review ${lowerRating} room guest reviews on ${analysis.platform} to identify recurring complaints (size, noise, bathroom, etc.) and prioritize improvements.</p>
            </div>
        </div>
    `;
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language preference
    const savedLang = localStorage.getItem('mariting_language');
    if (savedLang) {
        changeLanguage(savedLang);
    }
    
    // Setup drag & drop
    setupDragDrop();
    
    // Initialize demo chart
    initDemoChart();
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Close modal on outside click
window.addEventListener('click', function(e) {
    const modal = document.getElementById('aiModal');
    if (e.target === modal) {
        closeAIModal();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (demoAnimationInterval) {
        clearInterval(demoAnimationInterval);
    }
});


