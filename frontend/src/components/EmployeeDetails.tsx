import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  SxProps,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Employee } from "../models/Employee";
import { useCallback, useState } from "react";
import { Skill } from "@/models/Skill";

const tabPanelValue = {
  basicInfo: "基本情報",
  skills: "スキル",
  others: "その他",
};

type TabPanelValue = keyof typeof tabPanelValue;

const skillLevelText = {
  1: "初心者",
  2: "中級者",
  3: "上級者",
} as Record<number, string>;

interface TabContentProps {
  value: TabPanelValue;
  selectedValue: TabPanelValue;
  children: React.ReactNode;
  sx?: SxProps;
}

function TabContent({ value, selectedValue, children, sx }: TabContentProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== selectedValue}
      id={`tabpanel-${value}`}
      sx={sx}
    >
      {children}
    </Box>
  );
}

export type EmployeeDetailsProps = {
  employee: Employee;
};

export function EmployeeDetails(prop: EmployeeDetailsProps) {
  const [selectedTabValue, setSelectedTabValue] =
    useState<TabPanelValue>("basicInfo");
  const employee = prop.employee;

  const handleTabValueChange = useCallback(
    (event: React.SyntheticEvent, newValue: TabPanelValue) => {
      setSelectedTabValue(newValue);
    },
    []
  );

  return (
    <>
      <title>タレントマネジメントシステム - 社員詳細</title>

      <Paper sx={{ p: 2 }}>
        <Box
          display={"flex"}
          flexDirection="column"
          alignItems="flex-start"
          gap={1}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            p={2}
            gap={2}
          >
            <Avatar sx={{ width: 128, height: 128 }}>
              <PersonIcon sx={{ fontSize: 128 }} />
            </Avatar>
            <Typography variant="h5">{employee.name}</Typography>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs value={selectedTabValue} onChange={handleTabValueChange}>
              <Tab label={tabPanelValue.basicInfo} value={"basicInfo"} />
              <Tab label={tabPanelValue.skills} value={"skills"} />
              <Tab label={tabPanelValue.others} value={"others"} />
            </Tabs>
          </Box>

          <TabContent value={"basicInfo"} selectedValue={selectedTabValue}>
            <Box p={2} display="flex" flexDirection="column" gap={1}>
              <Typography variant="h6">基本情報</Typography>
              <Typography>年齢：{employee.age}歳</Typography>
              <Typography>所属：{employee.affiliation}</Typography>
              <Typography>役職：{employee.position}</Typography>
            </Box>
          </TabContent>

          <TabContent
            value={"skills"}
            selectedValue={selectedTabValue}
            sx={{ width: "100%" }}
          >
            <Box p={2} display="flex" flexDirection="column" gap={1}>
              <Typography variant="h6">スキル</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {employee.skills.map((skill: Skill) => (
                  <Card key={skill.name}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1" fontWeight="medium">
                          {skill.name}
                        </Typography>
                        <Typography variant="body2">
                          {skillLevelText[skill.level] || skill.level}
                        </Typography>
                      </Box>
                      <Typography variant="body2">{skill.detail}</Typography>

                      <Box display="flex" flexWrap="wrap" gap={1} marginTop={1}>
                        {skill.tags.map((tag: string) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </TabContent>

          <TabContent value={"others"} selectedValue={selectedTabValue}>
            <Box p={2} display="flex" flexDirection="column" gap={1}>
              <Typography variant="h6">その他</Typography>
            </Box>
          </TabContent>
        </Box>
      </Paper>
    </>
  );
}
