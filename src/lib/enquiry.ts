const WHATSAPP_NUMBER = '254700206558'; // 0700 206558 in international format

export function buildEnquiryLink(itemName: string, price?: string): string {
  const message = price
    ? `Hi, I'm interested in the ${itemName} (${price}) listed on Peep The Whip.`
    : `Hi, I'm interested in the ${itemName} listed on Peep The Whip.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
