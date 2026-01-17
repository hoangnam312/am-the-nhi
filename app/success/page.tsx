'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

/**
 * Success Page Content Component
 * Displays order confirmation details
 */
function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const name = searchParams.get('name');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Đặt Hàng Thành Công!</h1>
        <p className="text-gray-600 mb-8">
          Đơn hàng của bạn đã được gửi thành công đến bếp.
        </p>

        {/* Order details card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-left">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Mã Đơn Hàng</p>
            <p className="text-2xl font-bold text-primary-500">{orderId || 'N/A'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-1">Tên</p>
            <p className="text-xl font-semibold text-gray-800">{name || 'N/A'}</p>
          </div>
        </div>

        {/* Additional info */}
        <div className="bg-primary-50 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-700">
            Món ăn của bạn sẽ được chuẩn bị ngay. Vui lòng ngồi tại bàn và chờ chúng tôi mang ra.
          </p>
        </div>

        {/* Action button */}
        <Link href="/" className="btn-primary inline-block">
          Đặt Thêm Món
        </Link>
      </div>
    </div>
  );
}

/**
 * Success Page (Order Confirmation)
 * Shows order ID and table number after successful submission
 */
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
