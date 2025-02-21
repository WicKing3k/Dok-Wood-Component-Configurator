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
  bezeichnung: z.string().min(1, 'Bezeichnung is required'),
  rohstoff: z.string().optional(),
  hersteller: z.string().optional(),
  breite: z.number().nullable().optional(),
  hoehe: z.number().nullable().optional(),
  laenge: z.number().nullable().optional(),
  erscheinungsklasse: z.string().optional(),
  oberflaeche: z.string().optional(),
  keywords: z.string().optional(),
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
  ecoZertifizierung: z.string().optional(),
  oekobilanz: z.string().optional(),
  blauerEngel: z.boolean().optional(),
  produktdatenblatt: z.string().optional(),
  dopLeistungserklaerung: z.string().optional(),
  herstellernachweis: z.string().optional(),
  einheit: z.string().min(1, 'Einheit is required'),
  richtpreisFertigVerbaut: z.number().min(0, 'Richtpreis must be positive'),
  schnittstelleKalkulation: z.string().optional(),
  zusatzinfo: z.string().optional(),
  zusatzinfo2: z.string().optional(),
  textur3d: z.string().optional(),
  textur2d: z.string().optional(),
  produktID: z.string().optional(),
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
      breite: null,
      hoehe: null,
      laenge: null,
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
        return ['bezeichnung', 'rohstoff', 'hersteller', 'breite', 'hoehe', 'laenge', 'erscheinungsklasse', 'oberflaeche', 'keywords'];
      case 2:
        return ['lambda', 'sd', 'muTrocken', 'muFeucht', 'spezWaermekapazitaet', 'quelleBauphysik', 'rohdichte', 'flaechenlast', 'quelleRohdichte', 'aufbau', 'verleimung', 'festigkeitsklasse', 'baustoffklasseVKF', 'baustoffklasseEU', 'baustoffklasseDE', 'zusatzeigenschaft', 'quelleBaustoffklasse', 'rohdichteCharakteristisch', 'abbrandrateEindimensional', 'abbrandrateIdeell', 'materialtypBemessung', 'quelleBrandschutzbemessungswerte', 'dynamischeSteifigkeit'];
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

      await addMaterial({
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
        mu_trocken: data.muTrocken || null,
        mu_feucht: data.muFeucht || null,
        spez_waermekapazitaet: data.spezWaermekapazitaet || null,
        quelle_bauphysik: data.quelleBauphysik || null,
        rohdichte: data.rohdichte || null,
        flaechenlast: data.flaechenlast || null,
        quelle_rohdichte: data.quelleRohdichte || null,
        aufbau: data.aufbau || null,
        verleimung: data.verleimung || null,
        festigkeitsklasse: data.festigkeitsklasse || null,
        baustoffklasse_vkf: data.baustoffklasseVKF || null,
        baustoffklasse_eu: data.baustoffklasseEU || null,
        baustoffklasse_de: data.baustoffklasseDE || null,
        zusatzeigenschaft: data.zusatzeigenschaft || null,
        quelle_baustoffklasse: data.quelleBaustoffklasse || null,
        rohdichte_charakteristisch: data.rohdichteCharakteristisch || null,
        abbrandrate_eindimensional: data.abbrandrateEindimensional || null,
        abbrandrate_ideell: data.abbrandrateIdeell || null,
        materialtyp_bemessung: data.materialtypBemessung || null,
        quelle_brandschutzbemessungswerte: data.quelleBrandschutzbemessungswerte || null,
        dynamische_steifigkeit: data.dynamischeSteifigkeit || null,
        ubp_id: data.ubpID || null,
        eco_zertifizierung: data.ecoZertifizierung || null,
        oekobilanz: data.oekobilanz || null,
        blauer_engel: data.blauerEngel || null,
        produktdatenblatt: data.produktdatenblatt || null,
        dop_leistungserklaerung: data.dopLeistungserklaerung || null,
        herstellernachweis: data.herstellernachweis || null,
        einheit: data.einheit,
        richtpreis_fertig_verbaut: data.richtpreisFertigVerbaut,
        schnittstelle_kalkulation: data.schnittstelleKalkulation || null,
        zusatzinfo: data.zusatzinfo || null,
        zusatzinfo2: data.zusatzinfo2 || null,
        textur_3d: data.textur3d || null,
        textur_2d: data.textur2d || null,
        produkt_id: data.produktID || null,
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