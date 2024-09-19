import { envs } from "../../config/envs.plugin";

export function generateCaseEmailTemplate(
    name: string, 
    genre: string, 
    age: number, 
    lat: number, 
    lng: number, 
    country: string, 
    city: string
): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng);
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Case Information</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f0f2f5;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 900px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                display: flex;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
                border: 6px solid #7073C6; /* Azul-Morado claro */
            }
            .map-section {
                flex: 1;
                background-color: #eaeafc; /* Fondo claro */
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .map-img {
                max-width: 100%;
                border-radius: 10px;
            }
            .content {
                flex: 1;
                padding: 30px;
                font-size: 16px;
                line-height: 1.8;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .content h2 {
                font-size: 22px;
                color: #7073C6; /* Azul-Morado claro */
                margin-bottom: 15px;
            }
            .content p {
                margin: 8px 0;
                color: #444;
            }
            .content strong {
                color: #333;
            }
            .footer {
                background-color: #f0f2f5;
                padding: 20px;
                text-align: center;
                font-size: 13px;
                color: #777;
            }
            .footer p {
                margin: 0;
            }
            .detail-group {
                margin-bottom: 20px;
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
            }
            .description {
                font-style: italic;
                color: #555;
                padding: 15px;
                background-color: #f4f4f4;
                border-left: 6px solid #7073C6; /* Azul-Morado claro */
                border-radius: 8px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="map-section">
                <img src="${mapboxUrl}" alt="Map Location" class="map-img">
            </div>
            <div class="content">
                <div class="detail-group">
                    <h2>Case Information</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Genre:</strong> ${genre}</p>
                    <p><strong>Age:</strong> ${age}</p>
                    
                </div>
                <div class="detail-group">
                    <h2>Location Information</h2>
                    <p><strong>Latitude:</strong> ${lat}</p>
                    <p><strong>Longitude:</strong> ${lng}</p>
                    <p><strong>Country:</strong> ${country}</p>
                    <p><strong>City:</strong> ${city}</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>This is an automatically generated email. Please do not reply.</p>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number) => {
    const accessToken = envs.MAPBOX_ACCESS_TOKEN; 
    const zoom = 15; // Nivel de zoom
    const width = 400; // Ancho de la imagen
    const height = 400; // Altura de la imagen
 
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};