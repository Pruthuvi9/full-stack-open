```mermaid
sequenceDiagram
    participant browser
    participant server
browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The browser starts executing the callback for new form submission
```