

## About
Postman clone built with JavaScript. 
- Send request with GUI.
- Inspect request with GUI.
- Inspect responce with GUI.

** Requests are sent by Express.js and Axiom to allow CORS.

## Set-up

1. Clone the repo
   
2. Run the server

    - By Docker
        ```sh
        docker build -t <tag> .
        docker run -d --name <name> -p <port>:3000 <tag>
        ```
    - By npm
        ```sh
        npm install
        PORT=<port> node main.js
        # Windows : set PORT=<port> node main.js 
        # PowerShell : $env:PORT=<port> node main.js
        ```

3. Load `http://localhost:<port>/` in a browser


## Usage

1. Input url

1. Input key-value pair for parameter

1. Press "↻" to reset the row

1. Press "+" for more parameter row

1. Press "POST" or "GET" to send the request