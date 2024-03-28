import { App } from "./App";

document.getElementById('app')?.append(App())

/*import { el, setChildren, mount } from 'redom';

type FormSections = {
  tag: string,
  className: string
}

type TemplateFormProps = {
  formClassName: string,
  formSections: FormSections[]
}

type FormSectionsElement = {
  [key: string]: HTMLElement
}

type CreateCardProps = {
  data: SavedCard[]
}

type CardLogo = {
  tag: string,
  className: string,
  src?: string
}

type SavedCard = {
  bankLogo: CardLogo,
  brandLogo: CardLogo,
  last4: string,
  exp: string
}

type Cards = HTMLCollection[]

type TemplateForm = ({formClassName, formSections}: TemplateFormProps) => object
type CreateCards = ({data}: CreateCardProps) => Cards

const createCards: CreateCards = ({data}) => {

}

const getTemplateForm: TemplateForm = ({
  formClassName,
  formSections
}) => {
  const body = el('form', {
    className: formClassName
  }),
        elements: FormSectionsElement = {}

  formSections.forEach((section) => {
    const element = el(section.tag, {
      className: getClassName(formClassName, section.className)
    });

    elements[section.className] = element;

    mount(body, element);
  });

  return [
    body,
    elements
  ]
}

const createForm = () => {

}

function getClassName(parentClass: string, className: string) {
  return `${parentClass}__${className}`;
}*/