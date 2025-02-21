import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Progress } from '../ui/Progress';
import { useI18n } from '../../lib/i18n/i18n';
import { useMaterials } from '../../lib/stores/materials';
import { useAuth } from '../../lib/stores/auth';
import { BasicInfo } from './wizard/BasicInfo';
import { TechnicalDetails } from './wizard/TechnicalDetails';
import { StorageDetails } from './wizard/StorageDetails';
import { PricingDetails } from './wizard/PricingDetails';

const materialSchema = z.object({
  // Basic Info
  designation: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  articleNumber: z.string().min(1, 'Article number is required'),
  
  // Technical Details
  manufacturer: z.string().optional(),
  spatialLoad: z.number().nullable().optional(),
  areaLoad: z.number().nullable().optional(),
  densitySource: z.string().optional(),
  lambdaValue: z.number().nullable().optional(),
  sdValue: z.number().nullable().optional(),
  muDry: z.number().nullable().optional(),
  muWet: z.number().nullable().optional(),
  lambdaMuSource: z.string().optional(),
  vkfClassification: z.string().optional(),
  
  // Storage Details
  unit: z.string().min(1, 'Unit is required'),
  minStock: z.number().min(0, 'Minimum stock must be positive'),
  location: z.string().min(1, 'Storage location is required'),
  
  // Pricing Details
  price: z.number().min(0, 'Price must be positive'),
  supplier: z.string().min(1, 'Supplier is required'),
  orderNumber: z.string().min(1, 'Order number is required'),
});

type MaterialFormData = z.infer<typeof materialSchema>;

interface MaterialWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MaterialWizard({ isOpen, onClose }: MaterialWizardProps) {
  const { t } = useI18n();
  const { user } = useAuth();
  const { addMaterial } = useMaterials();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const methods = useForm<MaterialFormData>({
    resolver: zodResolver(materialSchema),
    mode: 'onChange',
    defaultValues: {
      spatialLoad: null,
      areaLoad: null,
      lambdaValue: null,
      sdValue: null,
      muDry: null,
      muWet: null,
    },
  });

  const steps = [
    { id: 1, title: t('materials.wizard.steps.basic'), component: BasicInfo },
    { id: 2, title: t('materials.wizard.steps.technical'), component: TechnicalDetails },
    { id: 3, title: t('materials.wizard.steps.storage'), component: StorageDetails },
    { id: 4, title: t('materials.wizard.steps.pricing'), component: PricingDetails },
  ];

  const handleNext = async () => {
    const isValid = await methods.trigger(getFieldsForStep(step));
    if (isValid) {
      if (step < steps.length) {
        setStep(step + 1);
      } else {
        await handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getFieldsForStep = (stepNumber: number): (keyof MaterialFormData)[] => {
    switch (stepNumber) {
      case 1:
        return ['designation', 'category', 'articleNumber'];
      case 2:
        return ['manufacturer', 'spatialLoad', 'areaLoad', 'densitySource', 'lambdaValue', 'sdValue', 'muDry', 'muWet', 'lambdaMuSource', 'vkfClassification'];
      case 3:
        return ['unit', 'minStock', 'location'];
      case 4:
        return ['price', 'supplier', 'orderNumber'];
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      const data = methods.getValues();
      
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      await addMaterial({
        designation: data.designation,
        manufacturer: data.manufacturer || null,
        spatial_load: data.spatialLoad || null,
        area_load: data.areaLoad || null,
        density_source: data.densitySource || null,
        lambda_value: data.lambdaValue || null,
        sd_value: data.sdValue || null,
        mu_dry: data.muDry || null,
        mu_wet: data.muWet || null,
        lambda_mu_source: data.lambdaMuSource || null,
        vkf_classification: data.vkfClassification || null,
        unit: data.unit,
        price: data.price,
        created_by: user.id,
      });

      onClose();
    } catch (err: any) {
      console.error('Failed to save material:', err);
      setError(err.message || 'Failed to save material');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[step - 1].component;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Dialog.Title className="text-2xl font-bold text-gray-900">
        {t('materials.wizard.title')}
      </Dialog.Title>

      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">
            {steps[step - 1].title}
          </h3>
          <Progress value={step} max={steps.length} className="mt-4" />
        </div>

        <FormProvider {...methods}>
          <form className="space-y-6">
            <CurrentStepComponent />

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {t('common.cancel')}
              </button>
              
              <div className="space-x-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {t('common.back')}
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-orange hover:bg-brand-orange/90 rounded-md disabled:opacity-50"
                >
                  {step === steps.length ? t('common.save') : t('common.next')}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
}