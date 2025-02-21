import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Progress } from '../ui/Progress';
import { useI18n } from '../../lib/i18n/i18n';
import { useProducts } from '../../lib/stores/products'; // Use products store
import { useAuth } from '../../lib/stores/auth';
import { BasicInfo } from './wizard/BasicInfo';
import { TechnicalDetails } from './wizard/TechnicalDetails';
import { StorageDetails } from './wizard/StorageDetails';
import { PricingDetails } from './wizard/PricingDetails';

const productSchema = z.object({
  // Basic Info
  bezeichnung: z.string().min(1, 'Bezeichnung is required'),
  rohstoff: z.string().optional(),
  hersteller: z.string().optional(),
  breite: z.number().nullable().optional(),
  hoehe: z.number().nullable().optional(),
  laenge: z.number().nullable().optional(),
  erscheinungsklasse: z.string().optional(),
  oberflaeche: z.string().optional(),
  keywords: z.string().optional(),
  
  // Technical Details
  lambda: z.number().nullable().optional(),
  sd: z.number().nullable().optional(),
  muTrocken: z.number().nullable().optional(),
  muFeucht: z.number().nullable().optional(),
  spezWaermekapazitaet: z.number().nullable().optional(),
  quelleBauphysik: z.string().optional(),
  rohdichte: z.number().nullable().optional(),
  flaechenlast: z.number().nullable().optional(),
  quelleRohdichte: z.string().optional(),
  aufbau: z.string().optional(),
  verleimung: z.string().optional(),
  festigkeitsklasse: z.string().optional(),
  baustoffklasseVKF: z.string().optional(),
  baustoffklasseEU: z.string().optional(),
  baustoffklasseDE: z.string().optional(),
  zusatzeigenschaft: z.string().optional(),
  quelleBaustoffklasse: z.string().optional(),
  rohdichteCharakteristisch: z.number().nullable().optional(),
  abbrandrateEindimensional: z.number().nullable().optional(),
  abbrandrateIdeell: z.number().nullable().optional(),
  materialtypBemessung: z.string().optional(),
  quelleBrandschutzbemessungswerte: z.string().optional(),
  dynamischeSteifigkeit: z.number().nullable().optional(),
  ubpID: z.string().optional(),
  
  // Storage Details
  einheit: z.string().min(1, 'Einheit is required'),
  richtpreisFertigVerbaut: z.number().min(0, 'Richtpreis must be positive'),
  schnittstelleKalkulation: z.string().optional(),
  zusatzinfo: z.string().optional(),
  zusatzinfo2: z.string().optional(),
  textur3d: z.string().optional(),
  textur2d: z.string().optional(),
  produktID: z.string().optional(),
  
  // Pricing Details
  ecoZertifizierung: z.string().optional(),
  oekobilanz: z.string().optional(),
  blauerEngel: z.boolean().optional(),
  produktdatenblatt: z.string().optional(),
  dopLeistungserklaerung: z.string().optional(),
  herstellernachweis: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductWizard({ isOpen, onClose }: ProductWizardProps) {
  const { t } = useI18n();
  const { user } = useAuth();
  const { addProduct } = useProducts(); // Use addProduct function
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      lambda: null,
      sd: null,
      muTrocken: null,
      muFeucht: null,
      spezWaermekapazitaet: null,
      rohdichte: null,
      flaechenlast: null,
      rohdichteCharakteristisch: null,
      abbrandrateEindimensional: null,
      abbrandrateIdeell: null,
      dynamischeSteifigkeit: null,
    },
  });

  const steps = [
    { id: 1, title: t('products.wizard.steps.basic'), component: BasicInfo },
    { id: 2, title: t('products.wizard.steps.technical'), component: TechnicalDetails },
    { id: 3, title: t('products.wizard.steps.storage'), component: StorageDetails },
    { id: 4, title: t('products.wizard.steps.pricing'), component: PricingDetails },
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

  const getFieldsForStep = (stepNumber: number): (keyof ProductFormData)[] => {
    switch (stepNumber) {
      case 1:
        return ['bezeichnung', 'rohstoff', 'hersteller', 'breite', 'hoehe', 'laenge', 'erscheinungsklasse', 'oberflaeche', 'keywords'];
      case 2:
        return ['lambda', 'sd', 'muTrocken', 'muFeucht', 'spezWaermekapazitaet', 'quelleBauphysik', 'rohdichte', 'flaechenlast', 'quelleRohdichte', 'aufbau', 'verleimung', 'festigkeitsklasse', 'baustoffklasseVKF', 'baustoffklasseEU', 'baustoffklasseDE', 'zusatzeigenschaft', 'quelleBaustoffklasse', 'rohdichteCharakteristisch', 'abbrandrateEindimensional', 'abbrandrateIdeell', 'materialtypBemessung', 'quelleBrandschutzbemessungswerte', 'dynamischeSteifigkeit', 'ubpID'];
      case 3:
        return ['einheit', 'richtpreisFertigVerbaut', 'schnittstelleKalkulation', 'zusatzinfo', 'zusatzinfo2', 'textur3d', 'textur2d', 'produktID'];
      case 4:
        return ['ecoZertifizierung', 'oekobilanz', 'blauerEngel', 'produktdatenblatt', 'dopLeistungserklaerung', 'herstellernachweis'];
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

      await addProduct({
        bezeichnung: data.bezeichnung,
        rohstoff: data.rohstoff || null,
        hersteller: data.hersteller || null,
        breite: data.breite || null,
        hoehe: data.hoehe || null,
        laenge: data.laenge || null,
        erscheinungsklasse: data.erscheinungsklasse || null,
        oberflaeche: data.oberflaeche || null,
        keywords: data.keywords || null,
        lambda: data.lambda || null,
        sd: data.sd || null,
        muTrocken: data.muTrocken || null,
        muFeucht: data.muFeucht || null,
        spezWaermekapazitaet: data.spezWaermekapazitaet || null,
        quelleBauphysik: data.quelleBauphysik || null,
        rohdichte: data.rohdichte || null,
        flaechenlast: data.flaechenlast || null,
        quelleRohdichte: data.quelleRohdichte || null,
        aufbau: data.aufbau || null,
        verleimung: data.verleimung || null,
        festigkeitsklasse: data.festigkeitsklasse || null,
        baustoffklasseVKF: data.baustoffklasseVKF || null,
        baustoffklasseEU: data.baustoffklasseEU || null,
        baustoffklasseDE: data.baustoffklasseDE || null,
        zusatzeigenschaft: data.zusatzeigenschaft || null,
        quelleBaustoffklasse: data.quelleBaustoffklasse || null,
        rohdichteCharakteristisch: data.rohdichteCharakteristisch || null,
        abbrandrateEindimensional: data.abbrandrateEindimensional || null,
        abbrandrateIdeell: data.abbrandrateIdeell || null,
        materialtypBemessung: data.materialtypBemessung || null,
        quelleBrandschutzbemessungswerte: data.quelleBrandschutzbemessungswerte || null,
        dynamischeSteifigkeit: data.dynamischeSteifigkeit || null,
        ubpID: data.ubpID || null,
        einheit: data.einheit,
        richtpreisFertigVerbaut: data.richtpreisFertigVerbaut,
        schnittstelleKalkulation: data.schnittstelleKalkulation || null,
        zusatzinfo: data.zusatzinfo || null,
        zusatzinfo2: data.zusatzinfo2 || null,
        textur3d: data.textur3d || null,
        textur2d: data.textur2d || null,
        produktID: data.produktID || null,
        ecoZertifizierung: data.ecoZertifizierung || null,
        oekobilanz: data.oekobilanz || null,
        blauerEngel: data.blauerEngel || null,
        produktdatenblatt: data.produktdatenblatt || null,
        dopLeistungserklaerung: data.dopLeistungserklaerung || null,
        herstellernachweis: data.herstellernachweis || null,
        created_by: user.id,
      });

      onClose();
    } catch (err: any) {
      console.error('Failed to save product:', err);
      setError(err.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[step - 1].component;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Dialog.Title className="text-2xl font-bold text-gray-900">
        {t('products.wizard.title')}
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