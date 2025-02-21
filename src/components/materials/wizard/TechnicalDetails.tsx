import { useFormContext } from 'react-hook-form';
import { useI18n } from '../../../lib/i18n/i18n';

export function TechnicalDetails() {
  const { t } = useI18n();
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.manufacturer')}
        </label>
        <input
          type="text"
          id="manufacturer"
          {...register('manufacturer')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="spatialLoad" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.spatialLoad')}
          </label>
          <input
            type="number"
            id="spatialLoad"
            step="0.01"
            {...register('spatialLoad', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="areaLoad" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.areaLoad')}
          </label>
          <input
            type="number"
            id="areaLoad"
            step="0.01"
            {...register('areaLoad', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="densitySource" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.densitySource')}
        </label>
        <input
          type="text"
          id="densitySource"
          {...register('densitySource')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lambdaValue" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.lambdaValue')}
          </label>
          <input
            type="number"
            id="lambdaValue"
            step="0.001"
            {...register('lambdaValue', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="sdValue" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.sdValue')}
          </label>
          <input
            type="number"
            id="sdValue"
            step="0.01"
            {...register('sdValue', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="muDry" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.muDry')}
          </label>
          <input
            type="number"
            id="muDry"
            step="0.01"
            {...register('muDry', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="muWet" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.muWet')}
          </label>
          <input
            type="number"
            id="muWet"
            step="0.01"
            {...register('muWet', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="lambdaMuSource" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.lambdaMuSource')}
        </label>
        <input
          type="text"
          id="lambdaMuSource"
          {...register('lambdaMuSource')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="vkfClassification" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.vkfClass')}
        </label>
        <input
          type="text"
          id="vkfClassification"
          {...register('vkfClassification')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>
    </div>
  );
}