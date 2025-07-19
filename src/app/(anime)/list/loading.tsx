import CardSkeleton from '@/components/UI/Card/CardSkeleton';
import { CheckboxStyles, Collapsible, Section } from '@/components/UI/UIComponents';
import { initAnimeFilters } from '@/constants/anime-default-filters';

export default function Loading() {
  return (
    <Section typeOfSection="TwoColSection">
      <Section.Col widthState="3/4">
        <Section typeOfSection={'grid'}>
          <CardSkeleton countOfCards={15} />
        </Section>
      </Section.Col>
      <Section.Col widthState="1/4">
        {Object.entries(initAnimeFilters ?? {}).map(([key, value], index) => {
          return (
            <Collapsible label={key} hidden={index < 2 ? true : false} key={key}>
              {value.type_of_filter == 'option' ? (
                <>
                  {(value.values ?? []).map((e: string | AnimeGenres) => {
                    const id = typeof e === 'string' ? e : e.id;
                    const title = typeof e === 'string' ? e : e.title;
                    return (
                      <div key={`${key}:${id}`} title={title} className={CheckboxStyles.checkbox} />
                    );
                  })}
                </>
              ) : (
                <>
                  <div>
                    <input key={`${key}:min`} type="number" />
                    <input key={`${key}:max`} type="number" />
                  </div>
                </>
              )}
            </Collapsible>
          );
        })}
      </Section.Col>
    </Section>
  );
}
