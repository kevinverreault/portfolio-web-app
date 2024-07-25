const NavigationItems : NavigationItem[] = [
  {
    text: "Accueil",
    path: "/"
  }, 
  {
    text: "Faune",
    path: "/faune"
  }, 
  {
    text: "Paysages",
    path: "/paysages"
  }, 
  {
    text: "Contact",
    path: "/contact"
  }
]

type NavigationItem = {
  text: string;
  path?: string;
  subMenuLinks?: NavigationMenuLink[]
}

type NavigationMenuLink = {
  text: string;
  path: string;
}

export { NavigationItems };
export type { NavigationItem , NavigationMenuLink };
