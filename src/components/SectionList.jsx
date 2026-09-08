import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable'
import SortableSectionItem from './SortableSectionItem.jsx'
import { SECTION_META } from '../data/defaultData.js'
import { SECTION_ICONS } from './icons/SectionIcons.jsx'

export default function SectionList({ order, onReorder, renderSection }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = order.indexOf(active.id)
    const newIndex = order.indexOf(over.id)
    onReorder(arrayMove(order, oldIndex, newIndex))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {order.map((key) => (
            <SortableSectionItem key={key} id={key} Icon={SECTION_ICONS[key]} label={SECTION_META[key].label}>
              {renderSection(key)}
            </SortableSectionItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
