import { Modal, ModalBody, ModalCloseButton, ModalContent, useColorModeValue, useTheme } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { colsPerRowAtom, datapointModalIndexAtom, datapointModalOpenAtom, context__datapointsAtom, globalSelectedDatapointsAtom, globalVisibleDatapointsAtom, selectedDatapointsAtom, visibleDatapointsAtom, datapointModalRowIndexAtom } from "./atoms"
import DataPanelModal from "./DataPanelModal"

interface DatapointModalProps {
  isOpen: boolean
  totalLength: number
}

const DatapointModal: React.FC<DatapointModalProps> = ({ isOpen, totalLength }) => {
  const [datapointModalIndex, setdatapointModalIndex] = useAtom(datapointModalIndexAtom)
  const [datapointModalRowIndex, setdatapointRowModalIndex] = useAtom(datapointModalRowIndexAtom)
  if (datapointModalIndex === null) return <></>
  const [colsPerRow] = useAtom(colsPerRowAtom)
  const [datapointModalOpen, updatedatapointModalOpen] = useAtom(datapointModalOpenAtom)

  const [visibleDatapoints] = useAtom(globalVisibleDatapointsAtom)
  const [selectedDatapoints] = useAtom(globalSelectedDatapointsAtom)
  var dps: number[] = []
  if (selectedDatapoints.length > 0) dps = selectedDatapoints
  else dps = visibleDatapoints

  const datapoint = datapointModalIndex

  let index = datapointModalRowIndex!
  const beginningOfList = (index === 0)
  const endOfList = (index === totalLength)
  const firstRow = ((index) < colsPerRow)
  const lastRow = ((index + 1) > (totalLength - colsPerRow))

  const theme = useTheme()
  const bgColor = useColorModeValue("#FFFFFF", '#0c0c0b')

  function handleKeyDown(event: any) {
    index = index!
    if ((event.keyCode === 37) && (!beginningOfList)) { // LEFT
      setdatapointRowModalIndex(index - 1)
    }
    if ((event.keyCode === 39) && (!endOfList)) { // RIGHT
      setdatapointRowModalIndex(index + 1)
    }
    if ((event.keyCode === 38) && (!firstRow)) { // UP
      setdatapointRowModalIndex(index - colsPerRow)
    }
    if ((event.keyCode === 40) && (!lastRow)) { // DOWN
      setdatapointRowModalIndex(index + colsPerRow)
    }
    if ((event.keyCode === 27)) { // ESC
      alert("esc!")
    }
  }

  return (
    <div
      onKeyDown={(e) => handleKeyDown(e)}
      tabIndex={0}
    >
      <Modal
        closeOnOverlayClick={false} // ESC also deselects... can we catch this
        isOpen={isOpen}
        onClose={() => updatedatapointModalOpen(false)}
        autoFocus={true}
        closeOnEsc={true}
        blockScrollOnMount={false}
        size="full"
        variant="datapoint"
        scrollBehavior="inside"
      >
        <ModalContent bgColor={bgColor} p={0} overflow="hidden">
          <ModalCloseButton />
          <ModalBody display="flex" p={0}>
            <DataPanelModal datapointId={datapoint} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default DatapointModal