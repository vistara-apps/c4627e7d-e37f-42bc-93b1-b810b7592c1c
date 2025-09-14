import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LinkGuard Frame',
  description: 'LinkGuard Farcaster Frame for link scanning',
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/api/frame/image',
    'fc:frame:button:1': 'Scan Link',
    'fc:frame:button:2': 'Help',
    'fc:frame:post_url': '/api/frame/actions',
  },
};

export default function FramePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 to-sky-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">LinkGuard Frame</h1>
        <p className="text-gray-600 mb-6">
          This is a Farcaster Frame. View it in a Farcaster client to interact with LinkGuard.
        </p>
        <div className="text-sm text-gray-500">
          <p>Frame URL: {process.env.NEXT_PUBLIC_BASE_URL}/api/frame</p>
        </div>
      </div>
    </div>
  );
}

