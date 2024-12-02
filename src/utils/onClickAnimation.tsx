import Link from "next/link";
import { useRouter } from "next/navigation"

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface TransitionLinkProps extends React.HTMLAttributes<HTMLDivElement> {
    url: string;
    children: React.ReactNode;
    isVision?: () => void | null;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({url, isVision = null, children, className, ...props}) => {
    const router = useRouter()

    const doLink = async (url: string, event: React.MouseEvent) => {
        event.preventDefault();
        if (isVision) {
            isVision();
        }
        console.log("transition button clicked")
        document.getElementById("transition")?.classList.remove("hidden")
        await sleep(1000)
        router.push(url)
        await sleep(1000)
        document.getElementById("transition")?.classList.add("hidden")
    }

    return <Link href={url} className={className}><div onClick={(event) => doLink(url, event)} {...props}>{children}</div></Link>
}

export default TransitionLink