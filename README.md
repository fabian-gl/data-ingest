
![para redme de fbi-02](https://github.com/user-attachments/assets/160f651e-cbdc-47db-bbe3-ed59afdaf65d)


>Core Framework 
![Static Badge](https://img.shields.io/badge/NestJS%20-%20%233178c6?label=Framework)
![Static Badge](https://img.shields.io/badge/Express%20-%20%23f1c40f?label=Server)
![Static Badge](https://img.shields.io/badge/Node.js%2022%20-%20%238bc500?label=Runtime%20Enviroment)


>Data Layer
![Static Badge](https://img.shields.io/badge/MongoDB%206%20-%20%2312924f?label=Data%20Storage)
![Static Badge](https://img.shields.io/badge/Mongoose%20-%20%237d160d?label=ODM)

>External Integration 
![Static Badge](https://img.shields.io/badge/Axios%20-%20%235a29e4?label=HTTP%20Client)
![Static Badge](https://img.shields.io/badge/Typescript%20-%20%233178c6?label=Development)
![Static Badge](https://img.shields.io/badge/Swagger%20-%20%23548039?label=API%20Documentation)
![Static Badge](https://img.shields.io/badge/Docker%20-%20%231e63ee?label=Containerized%20Deployment)


## 📚 Table of Contents

- [🚀 About](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#--about)
- [📊 Visual Overview](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#--visual-overview)
- [🧠 Core Capabilities](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#--core-capabilities)
- [🔄 Data Processing Features](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#--data-processing-features)
- [⚙️ Project Setup](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#%EF%B8%8F--project-setup)
- [🔧 Compile and 🏃‍♂️ Run the Project](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#--compile-and-%EF%B8%8F-run-the-project)
- [🌐 Network Setup](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#--network-setup)
- [🐳 Docker Setup](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#--docker-setup)
- [🔌 API Endpoints](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#--api-endpoints)
- [✅ Verification Steps](https://github.com/fabian-gl/data-ingest?tab=readme-ov-file#--verification-steps)

---
## 🚀 | About
This project automatically **collects data** from external sources,
*processes and standardizes* it, and then **stores** it in a database.
It also provides an API to *search and retrieve* the stored data.
Essentially, it's a system for **ingesting, normalizing, and querying** structured data.

## 📊 | Visual Overview
```mermaid
flowchart TD
    subgraph Input_Sources["Input Source"]
        A1["S3 JSON Files"]
    end

    subgraph Processing_Pipeline["Processing Pipeline"]
        B1["Stream Parser<br/>(stream-json)"]
        B2["Data Normalizers<br/>(normalizeStructuredData,<br/>normalizeLargeData)"]
        B3["Data Validator<br/>(isValidData)"]
        B4["Batch Processor<br/>(2000 records)"]
    end

    subgraph Storage_Layer["Storage Layer"]
        C1["NormalizedData Collection"]
        C2["ProcessError Collection"]
    end

    subgraph Query_Interface["Query Interface"]
        D1["DataQueryService"]
        D2["POST /api/v1/data-query"]
    end

    %% Flow connections
    A1 --> B1
    B1 --> B2
    B2 --> B3
    B3 -- "valid data" --> B4
    B3 -- "invalid data" --> C2
    B4 --> C1
    C1 --> D1 --> D2
```

## 🧠 | Core Capabilities
The system provides four primary capabilities:

|   Capability   |Implementation                 |Access Method                |
|----------------|-------------------------------|-----------------------------|
|**Automated Data Ingestion**|`CronService` with daily scheduling            |Automatic at midnight           |
|**Manual Data Ingestion** |`DataIngestController` endpoint |`POST /api/v1/data-ingest`    |
|**Data Querying**         |`DataQueryController` with filtering|`POST /api/v1/data-query`|
|**API Documentation**     |  Swagger integration|`GET /docs`|


## 🔄 | Data Processing Features
- Stream Processing: Uses `stream-json` for efficient handling of large JSON files
- Data Normalization: Converts multiple input formats into unified normalized data
- Batch Operations: Processes data in 2000-record batches for optimal performance
- Error Handling: Dedicated `ProcessError` collection for tracking failed operations
- Validation: Comprehensive data validation before persistence

## ⚙️ | Project Setup

```bash
$ npm install
```

## 🔧 | Compile and 🏃‍♂️ Run the Project

Copy the .env.example to a .env file and complete with your environment values

```bash
# development 
$ npm run start 
# watch mode 
$ npm run start:dev 
# production mode 
$ npm run start:prod
```

## 🌐 | Network Setup
The application requires a Docker network for container communication. Create the network before starting the services:

```bash
docker network create data-ingest-network
```
This network is referenced in `docker-compose.yaml` and allows the application container to communicate with the MongoDB container.


## 🐳 | Docker Setup
Start the complete system with a single command:

```bash
docker compose up -d
```
This command will:

>- Build the application image using the multi-stage ´Dockerfile´
>- Start the MongoDB container with the mongo:6 image
>- Start the NestJS application container
>- Establish network connectivity between containers

The data ingest will be done every day at midnight with a cron job. For testing puposes, an endpoint was made available to run it on demand.

>Once the application is running, access the Swagger documentation at:

```bash
http://localhost:3000/docs 
```
>The Swagger interface is configured in src/main.ts with the title "Ingest data" and provides interactive documentation for all available API endpoints.

## 🔌 | API Endpoints
The application exposes REST endpoints under the global prefix /api/v1/ as configured in `src/main.ts`
 Key endpoints include:

|   Endpoint     |         Method                |      Purpose                |
|----------------|-------------------------------|-----------------------------|
|`/api/v1/data-ingest`|POST        |Manual data ingestion trigger          |
|`/api/v1/data-query `|POST|Query normalized data with filters   |
|`/docs`       |GET|Swagger API documentation|


> 📝 Notes about search:
It is possible to search properties by id, city, country, availability, priceSegment, or price per night range.
Also it is possible to search for a property name that will be case and diacritic insensitive.

## ✅ | Verification Steps
1_Container Status Check
> Verify both containers are running:
```bash
docker-compose ps
```

2_Application Health Check
> Test the application responds to requests:

```bash
curl http://localhost:3000/docs
```
This should return the Swagger documentation HTML page.


![para redme de fbi-04](https://github.com/user-attachments/assets/ddef371e-51fc-4b4b-8b4f-87198662de3d)

