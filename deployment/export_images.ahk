#Requires AutoHotkey v2.0

CoordMode "Mouse", "Screen"
Sleep(3000)

ExportTab() {
	Click 363, 103
	Sleep(1000)
}

Acceuil() {
	Click 18, 106
	Sleep(1000)
}

Export() {
	Click 500, 500
	Sleep(1000)
	Click 546, 529
	Sleep(2000)
	Click 477, 378
	Sleep(2000)
}

Toggle() {
	Sleep(1000)
	Click
	Sleep(1000)
}

ToggleRecipe1() {
	MouseMove 18, 176, 100
	Toggle()
}

ToggleRecipe2() {
	MouseMove 18, 205, 100
	Toggle()
}

ToggleRecipe3() {
	MouseMove 18, 230, 100
	Toggle()
}

ToggleRecipe4() {
	MouseMove 18, 245, 100
	Toggle()
}

ToggleRecipe5() {
	MouseMove 18, 275, 100
	Toggle()
}

ToggleRecipe6() {
	MouseMove 18, 293, 100
	Toggle()
}

ToggleRecipe7() {
	MouseMove 18, 314, 100
	Toggle()
}

SelectRecipe1() {
	MouseMove 100, 176, 100
	Toggle()
}

SelectRecipe7() {
	MouseMove 100, 314, 100
	Toggle()
}

; Accueil

Click 150, 604
Send "^+{F10}"

ExportTab()

Sleep(1000)

ToggleRecipe1()
ToggleRecipe2()
ToggleRecipe3()
ToggleRecipe4()
ToggleRecipe5()
ToggleRecipe6()
ToggleRecipe7()
SelectRecipe1()

Export()

Sleep(2000)

; Faune

Acceuil()
Click 100, 625
Sleep(1000)

Send "^+{F11}"

Sleep(1000)

ExportTab()

ToggleRecipe7()
SelectRecipe1()

Export()

Sleep(3000)

ToggleRecipe1()
ToggleRecipe2()
ToggleRecipe3()
ToggleRecipe4()
ToggleRecipe5()
ToggleRecipe6()
ToggleRecipe7()
SelectRecipe7()

Sleep(1000)
Send "^+{F10}"
Sleep(1000)

Export()

; Paysages

Acceuil()
Click 100, 650
Sleep(1000)

ExportTab()

Sleep(1000)
Send "^+{F10}"
Sleep(1000)

Export()

ToggleRecipe1()
ToggleRecipe2()
ToggleRecipe3()
ToggleRecipe4()
ToggleRecipe5()
ToggleRecipe6()
ToggleRecipe7()
SelectRecipe1()

Sleep(1000)
Send "^+{F11}"
Sleep(1000)

Export()

ToggleRecipe1()
ToggleRecipe2()
ToggleRecipe3()
ToggleRecipe4()
ToggleRecipe5()
ToggleRecipe6()