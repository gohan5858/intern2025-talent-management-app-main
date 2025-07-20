import * as t from 'io-ts';

export const SkillT = t.type({
    name: t.string,
    level: t.number,
    detail: t.string,
    tags: t.array(t.string),
});

export type Skill = t.TypeOf<typeof SkillT>;
