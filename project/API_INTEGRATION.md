# API Integration Update

This document outlines the changes made to integrate the React application with the external API instead of using mock data.

## API Service

### New File: `src/services/api.service.ts`

A comprehensive API service has been created to handle all external API communications with the backend at `http://desktop-ejm27ku:5000`.

#### Features:
- **Type-safe interfaces** for all API responses and data structures
- **Error handling** with consistent error response format
- **REST API methods** for file management, user management, support tickets, and file recovery
- **Centralized configuration** with base URL and headers
- **Automatic date parsing** for proper Date object handling
- **UUID generation** for request tracking

#### Key Interfaces:
- `FileSearchRequest` - Search request object with q, filters, sort, system, and uuid
- `FileSearchResult` - Complete file information with metadata
- `UserInfo` - User details with roles and permissions  
- `SupportTicket` - Support ticket structure
- `FileVersion` - File version history
- `ApiResponse<T>` - Standardized API response wrapper

#### API Endpoints:
- `POST /files` - File search functionality (with request body)
- `/files/{id}` - File details retrieval
- `/files/{id}/unlock` - File unlocking
- `/files/{id}/emergency-access` - Emergency access granting
- `/users` - User management (CRUD operations)
- `/tickets` - Support ticket management
- `/files/versions` - File version history
- `/dashboard/stats` - Dashboard statistics
- `/health` - System health check

## Updated Components

### 1. AdminFileManagement Component
**File:** `src/components/admin/AdminFileManagement.tsx`

**Changes:**
- ✅ Imported API service and interfaces
- ✅ Replaced mock data with API calls
- ✅ Updated search function to use `apiService.searchFiles()` with POST request
- ✅ Enhanced file action execution with proper API integration
- ✅ Added error handling and display
- ✅ Improved loading states

**API Integration:**
- File search: `apiService.searchFiles(searchTerm)` - **POST /files**
- File unlock: `apiService.unlockFile(fileId, reason)`
- Emergency access: `apiService.grantEmergencyAccess(fileId, userId, reason)`
- File restoration: `apiService.restoreFileVersion(versionId, reason)`

### 2. FileManagement Component (Help Desk)
**File:** `src/components/helpdesk/FileManagement.tsx`

**Changes:**
- ✅ Imported API service and interfaces
- ✅ Replaced mock search results with API calls using POST request
- ✅ Updated file unlock functionality
- ✅ Added proper error handling
- ✅ Enhanced loading states

### 3. AdminUsers Component
**File:** `src/components/admin/AdminUsers.tsx`

**Changes:**
- ✅ Imported API service and interfaces
- ✅ Added user loading functionality
- ✅ Implemented user filtering and search
- ✅ Added error handling

## Real API Structure

### File Search Request (POST /files):
```json
{
  "q": "project",
  "filters": "",
  "sort": [
    {
      "field": "lastModified",
      "order": "desc"
    }
  ],
  "system": "file-access-help-desk",
  "uuid": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Request Parameters:
- **q**: Search term from client
- **filters**: String-based filter criteria (optional)
- **sort**: Array of sorting objects with field and order
- **system**: System identifier (defaults to "file-access-help-desk")
- **uuid**: Unique request identifier (auto-generated)

### File Search Response Example:
```json
{
  "success": true,
  "data": [
    {
      "id": "file123",
      "fileName": "budget-2024.xlsx",
      "filePath": "/finance/budget-2024.xlsx",
      "absolutePath": "/mnt/fileserver01/data/finance/budget-2024.xlsx",
      "serverLocation": "FILESERVER01.company.local",
      "networkPath": "\\\\FILESERVER01\\Finance\\budget-2024.xlsx",
      "size": "2.4 MB",
      "owner": {
        "name": "John Doe",
        "employeeId": "EMP001"
      },
      "creator": {
        "name": "Jane Smith", 
        "employeeId": "EMP002"
      },
      "department": "Finance",
      "status": "active",
      "lastModified": "2024-01-15T10:30:00Z",
      "modifiedBy": "John Doe",
      "createdAt": "2024-01-01T09:00:00Z",
      "permissions": {
        "view": ["Finance Team", "Managers"],
        "edit": ["Finance Team"],
        "admin": ["Finance Manager"]
      },
      "recentViews": [...],
      "recentChanges": [...],
      "activityLog": [...],
      "versions": [...]
    }
  ]
}
```

## Response Parsing Features

The API service includes automatic response parsing:

1. **Date Parsing**: Automatically converts string dates to Date objects
2. **Nested Object Parsing**: Handles complex nested structures
3. **Array Processing**: Processes arrays of data with proper type conversion
4. **Error Handling**: Graceful handling of parsing errors

### Parsed Date Fields:
- `lastModified`, `createdAt`, `time`, `date`
- `lastLogin`, `resolvedAt`, `lastUpdate`
- Nested dates in `recentViews`, `recentChanges`, `activityLog`, `versions`

## Error Handling

All API calls now include comprehensive error handling:

1. **Network errors** - Catch and display connection issues
2. **API errors** - Handle server-side errors with meaningful messages
3. **Loading states** - Show loading indicators during API calls
4. **User feedback** - Display success and error messages to users
5. **Response validation** - Validate and transform response data

## Configuration

The API base URL is configured in `api.service.ts`:
```typescript
const API_BASE_URL = 'http://desktop-ejm27ku:5000';
```

## File Search API Implementation

**Current Implementation (POST):**
```typescript
// POST request to /files with structured body
const requestBody: FileSearchRequest = {
  q: searchTerm,
  filters: filters || '',
  sort: [
    {
      field: 'lastModified',
      order: 'desc'
    }
  ],
  system: 'file-access-help-desk',
  uuid: generateUUID()
};

await fetch('/files', {
  method: 'POST',
  body: JSON.stringify(requestBody)
});
```

**Request Logging:**
The service logs all requests for debugging:
```typescript
console.log('Sending file search request:', requestBody);
```

## Benefits of This Integration

1. **Production Ready** - No more mock data, real backend integration
2. **Type Safety** - Full TypeScript interfaces ensure data consistency
3. **Error Resilience** - Proper error handling with user feedback
4. **Maintainable** - Centralized API logic in service layer
5. **Scalable** - Easy to add new API endpoints and functionality
6. **Real-time Data** - Live data from backend systems
7. **Audit Trail** - All actions are tracked through API calls
8. **Request Tracking** - UUID-based request tracking for debugging
9. **Date Handling** - Automatic parsing of date strings to Date objects

## Next Steps

1. **Backend Integration** - Ensure the .NET Core 8 backend implements the expected POST /files endpoint
2. **Authentication** - Add JWT token handling for secure API calls
3. **Real-time Updates** - Consider WebSocket integration for live updates
4. **Caching** - Implement response caching for better performance
5. **Advanced Filtering** - Implement UI controls for the filters string parameter
6. **Error Monitoring** - Add request/response logging for production monitoring

## Testing

To test the API integration:

1. Ensure the backend API is running at `http://desktop-ejm27ku:5000`
2. Start the React application: `npm run dev`
3. Test file search functionality with POST request to `/files`
4. Monitor browser console for request/response logging
5. Test file actions (unlock, emergency access)
6. Test user management features
7. Verify error handling with network issues
8. Check date parsing in file results

The application will gracefully handle API failures, parse response data correctly, and display appropriate error messages to users. 