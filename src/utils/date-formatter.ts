import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localizedFormat);
dayjs.extend(localeData);

type LocaleType = 'pt-BR' | 'en-US';
type AbbreviationType = 'short' | 'medium' | 'full';

export interface IFormatDateInput {
	/**
	 * A data a ser formatada. Pode ser uma string (ISO ou padrão aceito pelo Day.js),
	 * um objeto `Date` nativo do JavaScript ou uma instância do próprio `dayjs.Dayjs`.
	 */
	date: string | Date | dayjs.Dayjs;

	/**
	 * O idioma da formatação.
	 * @default 'pt-BR'
	 */
	locale?: LocaleType;

	/**
	 * O nível de abreviação/formatação da data e do dia da semana:
	 * - `short`: Formato numérico abreviado (ex: "21/10/2026" e dia "Q")
	 * - `medium`: Formato descritivo médio (ex: "21 de out de 2026" e dia "Qua")
	 * - `full`: Formato descritivo completo (ex: "21 de outubro de 2026" e dia "quarta-feira")
	 * @default 'medium'
	 */
	abbreviation?: AbbreviationType;

	/**
	 * Força a exibição ou ocultação da hora.
	 * Se omitido, a função tentará detectar automaticamente se o input original possui horário.
	 */
	includeTime?: boolean;
}

interface IFormatDateResult {
	/**
	 * A string contendo a data formatada de acordo com o nível de abreviação e o locale escolhidos.
	 */
	date: string;

	/**
	 * A string contendo o horário formatado (HH:mm:ss) caso esteja presente no input, ou `null` caso contrário.
	 */
	time: string | null;

	/**
	 * O dia da semana correspondente à data, adaptado à abreviação e ao idioma:
	 * - `short`: Inicial maiúscula (ex: "Q" ou "W")
	 * - `medium`: Abreviação de 3 letras (ex: "Qua" ou "Wed")
	 * - `full`: Nome completo do dia da semana (ex: "quarta-feira" ou "Wednesday")
	 */
	weekDay: string;
}

/**
 * Formata datas, horas e dias da semana utilizando a biblioteca Day.js.
 * Suporte para locales (`pt-BR` e `en-US`)
 *
 * @param params - Objeto de configuração contendo `date`, `locale`, `abbreviation` e `includeTime`.
 * @returns Um objeto `FormatDateResult` contendo a data formatada, o horário (se aplicável) e o dia da semana.
 *
 * @example
 * ```ts
 * const result = formatDate({
 *   date: '2026-10-21T08:02:17',
 *   locale: 'pt-BR',
 *   abbreviation: 'medium'
 * });
 * // Resultado: { date: "21 de out de 2026", time: "08:02:17", weekDay: "Qua" }
 * ```
 */
export function dateFormatter({ date, locale, abbreviation, includeTime }: IFormatDateInput): IFormatDateResult {
	// Normaliza o locale para o formato aceito pelo dayjs ('pt-br' ou 'en')
	const dayjsLocale = locale === 'pt-BR' ? 'pt-br' : 'en';
	const parsedDate = dayjs(date).locale(dayjsLocale);

	// Verifica se a data é válida
	if (!parsedDate.isValid()) {
		throw new Error('Data inválida fornecida para o formatador.');
	}

	// Detecta se a string original continha horário (caso venha no formato ISO ou com espaço)
	const hasTimeInput = typeof date === 'string' && (date.includes('T') || (date.includes(' ') && date.includes(':')));

	const shouldShowTime = includeTime ?? hasTimeInput;

	// Formatação da Hora
	const time = shouldShowTime ? parsedDate.format('HH:mm:ss') : null;

	// Formatação da Data e Dia da Semana com base no tipo de abreviação e locale
	let formattedDate = '';
	let weekDay = '';

	if (locale === 'pt-BR') {
		switch (abbreviation) {
			case 'short':
				formattedDate = parsedDate.format('DD/MM/YYYY');
				weekDay = parsedDate.format('dd');
				break;
			case 'medium':
				formattedDate = parsedDate.format('DD [de] MMM [de] YYYY');
				weekDay = parsedDate.format('ddd');
				break;
			case 'full':
				formattedDate = parsedDate.format('DD [de] MMMM [de] YYYY');
				weekDay = parsedDate.format('dddd');
				break;
		}
	} else {
		switch (abbreviation) {
			case 'short':
				formattedDate = parsedDate.format('MM/DD/YYYY');
				weekDay = parsedDate.format('dd');
				break;
			case 'medium':
				formattedDate = parsedDate.format('MMM DD, YYYY');
				weekDay = parsedDate.format('ddd');
				break;
			case 'full':
				formattedDate = parsedDate.format('MMMM DD, YYYY');
				weekDay = parsedDate.format('dddd');
				break;
		}
	}

	if (locale === 'en-US' && abbreviation === 'full') {
		weekDay = parsedDate.format('dddd');
	}

	return {
		date: formattedDate,
		time,
		weekDay,
	};
}
