```mermaid
classDiagram
    direction TB

    %% CLIENT SIDE (Presentation Layer)
    namespace Client_Frontend {
        class Auth_UI {
            <<View>>
            Login / Register
        }
        class Chat_UI {
            <<View>>
            Message List
        }
        class Group_UI {
            <<View>>
            Group Settings
        }
        class Client_API_Handler {
            <<Controller>>
            Axios / Fetch
        }
    }

    %% SERVER SIDE (Application Layer)
    namespace Server_Backend {
        class API_Gateway {
            <<Gateway>>
            REST / Socket
        }
        class AuthService {
            <<Service>>
            Login / Register logic
        }
        class MessageService {
            <<Service>>
            Send / Receive logic
        }
        class GroupService {
            <<Service>>
            Create / Edit Group
        }
        class ProfileService {
            <<Service>>
            Update User Info
        }
        class FileService {
            <<Service>>
            Upload / Download
        }
        class NotificationService {
            <<Service>>
            Push Notifs
        }
    }

    %% DATA SIDE (Data Layer)
    namespace Data_Storage {
        class D1_UserDB {
            <<Database>>
            Users & Profiles
        }
        class D2_MessageDB {
            <<Database>>
            Chat History
        }
        class D3_FileStore {
            <<Database>>
            File Storage
        }
        class D4_GroupDB {
            <<Database>>
            Group Info
        }
        class D5_AuditLog {
            <<Database>>
            Security Logs
        }
    }

    %% CONNECTIONS
    Auth_UI ..> Client_API_Handler
    Chat_UI ..> Client_API_Handler
    Group_UI ..> Client_API_Handler
    
    Client_API_Handler --> API_Gateway : HTTPS / WSS
    
    API_Gateway --> AuthService : /auth
    API_Gateway --> MessageService : /message
    API_Gateway --> GroupService : /group
    API_Gateway --> ProfileService : /profile
    API_Gateway --> FileService : /file

    %% INTERNAL LOGIC
    MessageService ..> NotificationService : Trigger Event
    GroupService ..> NotificationService : Trigger Event

    %% DATABASE ACCESS
    AuthService --> D1_UserDB : Read
    AuthService --> D5_AuditLog : Write
    
    ProfileService --> D1_UserDB : Update
    
    MessageService --> D2_MessageDB : Save
    MessageService --> D1_UserDB : Validate
    
    GroupService --> D4_GroupDB : Save
    GroupService --> D1_UserDB : Check Members
    
    FileService --> D3_FileStore : Save Blob