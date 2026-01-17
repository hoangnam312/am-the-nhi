import { NextRequest, NextResponse } from 'next/server';
import { appendOrderToSheet, generateOrderId } from '@/lib/googleSheets';
import { Order } from '@/types';

/**
 * POST /api/orders
 * Submit a new order to Google Sheets
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin: Số bàn và món ăn là bắt buộc' },
        { status: 400 }
      );
    }

    // Validate table number is not empty string
    if (typeof body.name !== 'string' || body.name.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Số bàn không được để trống' },
        { status: 400 }
      );
    }

    // Create order object
    const order: Order = {
      orderId: generateOrderId(),
      name: body.name.trim(),
      items: body.items,
      totalPrice: body.totalPrice || 0,
      notes: body.notes || '',
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Write to Google Sheets
    await appendOrderToSheet(order);

    // Return success with order ID
    return NextResponse.json({
      success: true,
      orderId: order.orderId
    });

  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể gửi đơn hàng. Vui lòng thử lại.'
      },
      { status: 500 }
    );
  }
}
