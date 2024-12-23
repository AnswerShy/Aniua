export default function isLoggined() {
    if (typeof document === "undefined") return false;

    const getCookie = (name: string) => 
        document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1];

    return Boolean(getCookie("authToken"));
}