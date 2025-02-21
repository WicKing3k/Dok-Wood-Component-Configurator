import { useFormContext } from 'react-hook-form';
import { useI18n } from '../../../lib/i18n/i18n';

export function TechnicalDetails() {
  const { t } = useI18n();
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="lambda" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.lambda')}
        </label>
        <input
          type="number"
          id="lambda"
          step="0.001"
          {...register('lambda', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="sd" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.sd')}
        </label>
        <input
          type="number"
          id="sd"
          step="0.01"
          {...register('sd', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="muTrocken" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.muTrocken')}
          </label>
          <input
            type="number"
            id="muTrocken"
            step="0.01"
            {...register('muTrocken', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="muFeucht" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.muFeucht')}
          </label>
          <input
            type="number"
            id="muFeucht"
            step="0.01"
            {...register('muFeucht', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="spezWaermekapazitaet" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.spezWaermekapazitaet')}
        </label>
        <input
          type="number"
          id="spezWaermekapazitaet"
          step="0.01"
          {...register('spezWaermekapazitaet', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="quelleBauphysik" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.quelleBauphysik')}
        </label>
        <input
          type="text"
          id="quelleBauphysik"
          {...register('quelleBauphysik')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="rohdichte" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.rohdichte')}
        </label>
        <input
          type="number"
          id="rohdichte"
          step="0.01"
          {...register('rohdichte', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="flaechenlast" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.flaechenlast')}
        </label>
        <input
          type="number"
          id="flaechenlast"
          step="0.01"
          {...register('flaechenlast', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="quelleRohdichte" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.quelleRohdichte')}
        </label>
        <input
          type="text"
          id="quelleRohdichte"
          {...register('quelleRohdichte')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="aufbau" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.aufbau')}
        </label>
        <input
          type="text"
          id="aufbau"
          {...register('aufbau')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="verleimung" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.verleimung')}
        </label>
        <input
          type="text"
          id="verleimung"
          {...register('verleimung')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="festigkeitsklasse" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.festigkeitsklasse')}
        </label>
        <input
          type="text"
          id="festigkeitsklasse"
          {...register('festigkeitsklasse')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="baustoffklasseVKF" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.baustoffklasseVKF')}
        </label>
        <input
          type="text"
          id="baustoffklasseVKF"
          {...register('baustoffklasseVKF')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="baustoffklasseEU" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.baustoffklasseEU')}
        </label>
        <input
          type="text"
          id="baustoffklasseEU"
          {...register('baustoffklasseEU')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="baustoffklasseDE" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.baustoffklasseDE')}
        </label>
        <input
          type="text"
          id="baustoffklasseDE"
          {...register('baustoffklasseDE')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="zusatzeigenschaft" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.zusatzeigenschaft')}
        </label>
        <input
          type="text"
          id="zusatzeigenschaft"
          {...register('zusatzeigenschaft')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="quelleBaustoffklasse" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.quelleBaustoffklasse')}
        </label>
        <input
          type="text"
          id="quelleBaustoffklasse"
          {...register('quelleBaustoffklasse')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="rohdichteCharakteristisch" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.rohdichteCharakteristisch')}
        </label>
        <input
          type="number"
          id="rohdichteCharakteristisch"
          step="0.01"
          {...register('rohdichteCharakteristisch', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="abbrandrateEindimensional" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.abbrandrateEindimensional')}
        </label>
        <input
          type="number"
          id="abbrandrateEindimensional"
          step="0.01"
          {...register('abbrandrateEindimensional', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="abbrandrateIdeell" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.abbrandrateIdeell')}
        </label>
        <input
          type="number"
          id="abbrandrateIdeell"
          step="0.01"
          {...register('abbrandrateIdeell', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="materialtypBemessung" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.materialtypBemessung')}
        </label>
        <input
          type="text"
          id="materialtypBemessung"
          {...register('materialtypBemessung')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="quelleBrandschutzbemessungswerte" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.quelleBrandschutzbemessungswerte')}
        </label>
        <input
          type="text"
          id="quelleBrandschutzbemessungswerte"
          {...register('quelleBrandschutzbemessungswerte')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="dynamischeSteifigkeit" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.dynamischeSteifigkeit')}
        </label>
        <input
          type="number"
          id="dynamischeSteifigkeit"
          step="0.01"
          {...register('dynamischeSteifigkeit', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="ubpID" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.ubpID')}
        </label>
        <input
          type="text"
          id="ubpID"
          {...register('ubpID')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="ecoZertifizierung" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.ecoZertifizierung')}
        </label>
        <input
          type="text"
          id="ecoZertifizierung"
          {...register('ecoZertifizierung')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="oekobilanz" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.oekobilanz')}
        </label>
        <input
          type="text"
          id="oekobilanz"
          {...register('oekobilanz')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="blauerEngel" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.blauerEngel')}
        </label>
        <input
          type="checkbox"
          id="blauerEngel"
          {...register('blauerEngel')}
          className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="produktdatenblatt" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.produktdatenblatt')}
        </label>
        <input
          type="text"
          id="produktdatenblatt"
          {...register('produktdatenblatt')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="dopLeistungserklaerung" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.dopLeistungserklaerung')}
        </label>
        <input
          type="text"
          id="dopLeistungserklaerung"
          {...register('dopLeistungserklaerung')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="herstellernachweis" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.herstellernachweis')}
        </label>
        <input
          type="text"
          id="herstellernachweis"
          {...register('herstellernachweis')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>
    </div>
  );
}