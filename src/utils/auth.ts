export default function isLoggined() {
    if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);
        return !!cookies["authToken"]; 
    }
    return false;
}
