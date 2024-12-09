import CardSkeleton from "@/components/Shared/Card/CardSkeleton";
import { Section } from "@/components/Shared/SharedComponents";

export default function Loading() {
    return <Section typeOfSection={"grid"}><CardSkeleton  countOfCards={16} /></Section>
}