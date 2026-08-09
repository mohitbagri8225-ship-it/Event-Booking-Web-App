class ApiResponse {
    constructor(statuscode, message = "success", data = null) {
        this.success = statuscode >= 200 && statuscode < 300;
        this.message = message;
        this.data = data;
        this.statusCode = statuscode;
    }
}

export default ApiResponse;