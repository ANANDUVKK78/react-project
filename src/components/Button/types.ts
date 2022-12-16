import { MouseEvent } from 'react';

export type Props = {
    type?: 'button' | 'submit' | 'reset'
    className?: string
    label: string
    disabled?: boolean
    click?(e: MouseEvent<HTMLElement>): void
}
