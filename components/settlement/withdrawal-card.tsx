'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Wallet, CreditCard, AlertCircle } from 'lucide-react'

interface WithdrawalCardProps {
  availableAmount: number
  paymentMethod: string
  paymentDetails: string
}

export function WithdrawalCard({ availableAmount, paymentMethod, paymentDetails }: WithdrawalCardProps) {
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const minimumWithdrawal = 10

  const handleWithdraw = () => {
    // In real app, this would process the withdrawal
    setIsDialogOpen(false)
    setWithdrawAmount('')
  }

  const isValidAmount = Number(withdrawAmount) >= minimumWithdrawal && Number(withdrawAmount) <= availableAmount

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Wallet className="h-5 w-5 text-primary" />
        <CardTitle className="text-base font-medium">출금 신청</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Available Amount */}
        <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
          <p className="text-sm opacity-80">출금 가능 금액</p>
          <p className="mt-1 text-4xl font-bold">${availableAmount}</p>
        </div>

        {/* Payment Method */}
        <div className="flex items-center gap-3 rounded-lg border border-border p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{paymentMethod}</p>
            <p className="text-sm text-muted-foreground">{paymentDetails}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            변경
          </Button>
        </div>

        {/* Withdrawal Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={availableAmount < minimumWithdrawal}
            >
              출금 신청하기
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>출금 신청</DialogTitle>
              <DialogDescription>
                출금할 금액을 입력해주세요. 최소 출금 금액은 ${minimumWithdrawal}입니다.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">출금 금액</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="pl-8"
                    min={minimumWithdrawal}
                    max={availableAmount}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  최대 출금 가능: ${availableAmount}
                </p>
              </div>

              {withdrawAmount && !isValidAmount && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {Number(withdrawAmount) < minimumWithdrawal 
                    ? `최소 출금 금액은 $${minimumWithdrawal}입니다.`
                    : `출금 가능 금액을 초과했습니다.`
                  }
                </div>
              )}

              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="font-medium">출금 정보</p>
                <p className="text-muted-foreground">{paymentMethod}: {paymentDetails}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                취소
              </Button>
              <Button 
                onClick={handleWithdraw} 
                disabled={!isValidAmount}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                출금 신청
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Notice */}
        <p className="text-center text-xs text-muted-foreground">
          출금 신청 후 영업일 기준 2-3일 내 처리됩니다.
        </p>
      </CardContent>
    </Card>
  )
}
