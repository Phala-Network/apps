import {Description, Root, Title} from './styledComponents'

type Props = {
  title: string
  description?: string
}

export const PageHeader = (props: Props) => {
  return (
    <Root>
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
    </Root>
  )
}
