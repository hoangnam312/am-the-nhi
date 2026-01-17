import { google } from 'googleapis';
import { Order } from '@/types';

/**
 * Initialize and return Google Sheets API client
 * Uses service account authentication with credentials from environment variables
 */
export async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Replace escaped newlines with actual newlines
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

/**
 * Append order data to Google Sheets
 * @param order - Order object containing all order details
 */
export async function appendOrderToSheet(order: Order): Promise<void> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  // Format items as string: "2x Phở Bò, 1x Trà Đá"
  const itemDetails = order.items
    .map(item => `${item.quantity}x ${item.name}`)
    .join(', ');

  // Prepare row data matching sheet structure:
  // Timestamp | Order ID | Table Number | Item Details | Total Price | Notes | Status
  const values = [[
    order.timestamp,
    order.orderId,
    order.name,
    itemDetails,
    order.totalPrice,
    order.notes || '-',
    order.status
  ]];

  // Append to "Orders" sheet
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Orders!A:G',
    valueInputOption: 'RAW',
    requestBody: { values },
  });
}

export function generateOrderId(): string {
  return Date.now().toString();
}
