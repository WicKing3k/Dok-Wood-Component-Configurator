import { useEffect, useState, useCallback } from 'react';
import { Plus, WifiOff, RefreshCw } from 'lucide-react';
import { useI18n } from '../../lib/i18n/i18n';
import { useMaterials } from '../../lib/stores/materials';
import { MaterialsList } from './MaterialsList';
import { checkSupabaseConnection } from '../../lib/supabase';
import { MaterialWizard } from '../../components/materials/MaterialWizard';
import { ProductWizard } from '../../components/materials/ProductWizard'; // Import ProductWizard

export function MaterialsPage() {
  const { t } = useI18n();
  const { materials, loading, fetchMaterials } = useMaterials();
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isProductWizardOpen, setIsProductWizardOpen] = useState(false);
  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds between retries

  const loadMaterials = useCallback(async () => {
    try {
      setIsRetrying(true);
      
      // Check connection first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        throw new Error(t('materials.connectionError'));
      }
      
      await fetchMaterials();
      setError(null);
      setRetryCount(0);
    } catch (err: any) {
      console.error('Failed to fetch materials:', err);
      setError(err.message || t('materials.fetchError'));
      
      // Auto-retry if we haven't reached max retries
      if (retryCount < maxRetries - 1) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => loadMaterials(), retryDelay);
      }
    } finally {
      setIsRetrying(false);
    }
  }, [fetchMaterials, t, retryCount]);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  const handleRetry = async () => {
    if (retryCount >= maxRetries) {
      setError(t('materials.maxRetriesReached'));
      return;
    }
    
    setRetryCount(0); // Reset retry count for manual retries
    await loadMaterials();
  };

  if (loading && !error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <RefreshCw className="h-8 w-8 text-brand-orange animate-spin mb-4" />
        <div className="text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <WifiOff className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {t('materials.connectionError')}
        </h2>
        <p className="text-gray-600 max-w-md mb-4">{error}</p>
        <div className="space-y-2">
          <button
            onClick={handleRetry}
            disabled={isRetrying || retryCount >= maxRetries}
            className={`inline-flex items-center justify-center px-4 py-2 bg-brand-orange text-white rounded-md transition-colors w-full ${
              isRetrying || retryCount >= maxRetries
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-brand-orange/90'
            }`}
          >
            {isRetrying ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                {t('common.retrying')}
              </>
            ) : (
              <>
                <RefreshCw className="h-5 w-5 mr-2" />
                {t('common.retry')} {retryCount < maxRetries && `(${maxRetries - retryCount} ${t('common.attemptsLeft')})`}
              </>
            )}
          </button>
          {retryCount >= maxRetries && (
            <p className="text-sm text-gray-500">
              {t('materials.contactSupport')}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('materials.title')}
        </h1>
        <div className="space-x-4">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-brand-orange/90 transition-colors"
            onClick={() => setIsWizardOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('materials.add')}
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-brand-orange/90 transition-colors"
            onClick={() => setIsProductWizardOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('products.add')}
          </button>
        </div>
      </div>

      <MaterialsList materials={materials} />

      <MaterialWizard 
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
      <ProductWizard 
        isOpen={isProductWizardOpen}
        onClose={() => setIsProductWizardOpen(false)}
      />
    </div>
  );
}