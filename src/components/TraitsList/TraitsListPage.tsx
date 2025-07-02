import { Box, Card, Center } from "@chakra-ui/react"

export const TraitsListPage = () => {
  return (
    <Box padding={4}>
      <Card.Root>
        <Card.Title padding={2}>Магазин специализаций</Card.Title>
        <Card.Body>
          <Center h="80vh">
            <Box>Здесь что-то будет, оставайтесь с нами</Box>
          </Center>
        </Card.Body>
      </Card.Root>
    </Box>
  )
}