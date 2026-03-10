'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoanCalculatorFAQ } from '@/components/tools/LoanCalculatorFAQ';
import { CalculatorCategoryLinks } from '@/components/tools/CalculatorCategoryLinks';
import { LoanCalculatorSection } from './sections/LoanCalculatorSection';
import { PrepaymentFeeSection } from './sections/PrepaymentFeeSection';

export function LoanCalculatorForm() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="loan-calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="loan-calculator">대출 계산기</TabsTrigger>
          <TabsTrigger value="prepayment-fee">중도상환 수수료</TabsTrigger>
        </TabsList>

        <TabsContent value="loan-calculator" className="space-y-6">
          <LoanCalculatorSection />
        </TabsContent>

        <TabsContent value="prepayment-fee" className="space-y-6">
          <PrepaymentFeeSection />
        </TabsContent>
      </Tabs>

      <CalculatorCategoryLinks currentToolId="loan-calculator" />

      <LoanCalculatorFAQ />
    </div>
  );
}
