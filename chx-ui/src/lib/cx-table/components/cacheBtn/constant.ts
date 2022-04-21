import { InjectionKey, Ref } from 'vue';

export const INJECT_BADGE_KEY: InjectionKey<Ref<Record<'notCommitNum' | 'rejectNum' | 'revokeNum', number>>> = Symbol('badgeMap');
