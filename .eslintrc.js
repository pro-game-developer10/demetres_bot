module.exports = {
	"env": {
		"node": true,
	},
	"extends": [
		"eslint:recommended",
        "plugin:@typescript-eslint/recommended",
	],
	"parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
    "plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"quotes": [
			"error",
			"double"
        ],
        "@typescript-eslint/no-namespace": [
            "off"
        ],
        "no-inner-declarations": [
            "off"
        ]
	}
}
