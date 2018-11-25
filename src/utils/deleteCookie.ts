export default function delete_cookie(name: string) : void {
    if (typeof document !== "undefined"){
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }