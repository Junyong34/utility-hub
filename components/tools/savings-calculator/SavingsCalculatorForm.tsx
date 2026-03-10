'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalculatorCategoryLinks } from '@/components/tools/CalculatorCategoryLinks';
import { DepositCalculatorSection } from './sections/DepositCalculatorSection';
import { InstallmentCalculatorSection } from './sections/InstallmentCalculatorSection';
import { SavingsCalculatorFAQ } from './SavingsCalculatorFAQ';

export function SavingsCalculatorForm() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">예금 계산기</TabsTrigger>
          <TabsTrigger value="installment">적금 계산기</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="space-y-6">
          <DepositCalculatorSection />
        </TabsContent>

        <TabsContent value="installment" className="space-y-6">
          <InstallmentCalculatorSection />
        </TabsContent>
      </Tabs>

      <CalculatorCategoryLinks currentToolId="savings-calculator" />

      <SavingsCalculatorFAQ />
    </div>
  );
}
