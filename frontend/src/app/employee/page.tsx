'use client';
import { EmployeeDetailsContainer } from '@/components/EmployeeDetailsContainer';
import { GlobalContainer } from '@/components/GlobalContainer';
import { Box, Button } from '@mui/material';
import { Suspense } from 'react';

export default function EmployeePage() {
  return (
    <GlobalContainer pageName={'社員検索'}>
      {/* Mark EmployeeDetailsContainer as CSR */}
      <Suspense>
          <EmployeeDetailsContainer />
      </Suspense>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ margin: 2 }} onClick={() => window.history.back()}>
          検索画面に戻る
        </Button>
      </Box>
    </GlobalContainer>
  );
}
