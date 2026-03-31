import type { ListWithCards } from "#/types/list"

interface ListContainerProps {
  boardId: string
  lists:ListWithCards[]
}

export default function ListContainer({}: ListContainerProps) {
  return <div>ListContainer</div>
}
