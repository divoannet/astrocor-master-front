import { Box, SimpleGrid } from "@chakra-ui/react";
import { TextField } from "./FieldText";
import { FieldRoll } from "./FieldRoll";
import { FieldNumber } from "./FieldNumber";
import { RegionSelect } from "./RegionSelect";

export const NpcForm = () => {
  return (
    <Box spaceY={8}>
      <SimpleGrid columns={4} gap={4}>
        <div>
          <TextField
            fieldName="name"
            label="Имя"
          />
        </div>
        <div>
          <TextField
            fieldName="type"
            label="Роль / тип"
            placeholder="командир, заражённый, технарь, лесник"
          />
        </div>
        <div>
          <RegionSelect />
        </div>
        <div>
          <TextField
            fieldName="image"
            label="Ссылка на изображение"
          />
        </div>
      </SimpleGrid>
      <SimpleGrid columns={3} gap={4}>
        <div>
          <TextField
            fieldName="goal"
            label="Цель"
            multiline
          />
        </div>
        <div>
          <TextField
            fieldName="description"
            label="Описание персонажа"
            multiline
          />
        </div>
        <div>
          <TextField
            fieldName="relation"
            label="Отношение к игрокам"
            multiline
            placeholder="союзник, враждебен, нестабилен, скрытый"
          />
        </div>
      </SimpleGrid>
      <SimpleGrid columns={6} gap={4} alignItems='flex-end'>
        <div>
          <FieldRoll
            fieldName="battle"
            label="Боевые"
          />
        </div>
        <div>
          <FieldRoll
            fieldName="intellect"
            label="Интеллектуальные"
          />
        </div>
        <div>
          <FieldRoll
            fieldName="craft"
            label="Технические"
          />
        </div>
        <div>
          <FieldRoll
            fieldName="physical"
            label="Физ. устойчивость"
          />
        </div>
        <div>
          <FieldRoll
            fieldName="social"
            label="Социальные"
          />
        </div>
        <div>
          <FieldRoll
            fieldName="custom"
            label="Особое"
            custom
          />
        </div>
      </SimpleGrid>
      <SimpleGrid columns={3} gap={4}>
        <div>
          <TextField
            fieldName="danger"
            label="Как реагирует на угрозу"
            multiline
          />
        </div>
        <div>
          <TextField
            fieldName="features"
            label="Особенности в бою / переговорах / симпатии"
            multiline
          />
        </div>
        <div>
          <TextField
            fieldName="triggers"
            label="Что выводит из равновесия"
            multiline
          />
        </div>
      </SimpleGrid>
      <SimpleGrid columns={3} gap={4}>
        <div>
          <FieldNumber
            fieldName="checkDifficulty"
            label="Типовая сложность"
          />
        </div>
        <div>
          <TextField
            fieldName="checkFailure"
            label="Возможные последствия провала"
            multiline
          />
        </div>
        <div>
          <TextField
            fieldName="extra"
            label="Дополнительно"
            placeholder="предметы, связи, ключевые фразы, события"
            multiline
          />
        </div>
      </SimpleGrid>
    </Box>
  )
};
