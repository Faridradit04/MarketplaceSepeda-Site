import { bikeController } from '../Service/bikeServices.js';
import bulkBikeData from '../data/bulkBikes.js';

export const bulkUploadUI = `
<div id="bulkUploadModal" class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center p-4 z-50" style="display: none;">
  <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full m-auto mt-20">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">📦 Bulk Upload Bikes</h2>
    
    <div class="space-y-4">
      <p class="text-gray-600">
        Add 100 sample bikes to your database.
        <br>
        <strong>Warning:</strong> This will add many bikes at once!
      </p>

      <div id="uploadProgress" class="hidden">
        <div class="bg-gray-200 rounded-full h-4 overflow-hidden">
          <div id="progressBar" class="bg-blue-600 h-full w-0 transition-all duration-300"></div>
        </div>
        <p id="progressText" class="text-center text-sm text-gray-600 mt-2">0/100 bikes added</p>
      </div>

      <div class="flex gap-2">
        <button onclick="startBulkUpload()" id="startBtn" class="flex-1 btn-primary">Start Upload</button>
        <button onclick="closeBulkUploadModal()" id="closeBtn" class="flex-1 btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
</div>
`;

export async function startBulkUpload() {
  const startBtn = document.getElementById('startBtn');
  const closeBtn = document.getElementById('closeBtn');
  const uploadProgress = document.getElementById('uploadProgress');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  startBtn.disabled = true;
  closeBtn.disabled = true;
  uploadProgress.classList.remove('hidden');

  let successCount = 0;
  const total = bulkBikeData.length;

  for (let i = 0; i < total; i++) {
    const bike = bulkBikeData[i];
    try {
      const result = await bikeController.addBike(bike.name, bike.price);
      if (result.success) {
        successCount++;
      }
    } catch (err) {
      console.error(`Failed to add bike ${i + 1}:`, err);
    }

    // Update progress
    const percentage = ((i + 1) / total) * 100;
    progressBar.style.width = percentage + '%';
    progressText.textContent = `${i + 1}/${total} bikes added`;

    // Add delay to avoid overwhelming server
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  progressText.textContent = `✅ Completed! ${successCount}/${total} bikes added successfully`;
  startBtn.textContent = 'Done!';
  startBtn.disabled = false;

  // Reload bikes after 2 seconds
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

export function openBulkUploadModal() {
  const modal = document.getElementById('bulkUploadModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

export function closeBulkUploadModal() {
  const modal = document.getElementById('bulkUploadModal');
  if (modal) {
    modal.style.display = 'none';
  }
}
