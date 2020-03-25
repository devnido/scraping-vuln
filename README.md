# Scraping para perri

Web scraping a pagina web de vulnerabilidades 

1. Request a https://www.incibe-cert.es/alerta-temprana/vulnerabilidades/{{cve}}
2. Consulta si el cve ya existe en la base de datos, si existe no hace nada
3. Consulta si la vuln está en la web de incibe-cert
4. Si está hace el scraping
5. Guarda en la base de datos todos los CVE encontrados en la web de incibe-cert

## Como usar

1. Iniciar servicio mongod
2. ejecutar npm install 
3. En la linea 24 del código fuente del archivo app.js escribir loc cve en el array
4. ejecutar node app.js
5. fin