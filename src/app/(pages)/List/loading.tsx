import CardSkeleton from "@/components/Shared/Card/CardSkeleton";
import { Section } from "@/components/Shared/SharedComponents";

export default function Loading() {
    return <Section><CardSkeleton  countOfCards={16} /></Section>
}