import { describe, expect, it } from 'bun:test'
import { highlighter } from '@utils/decorate'
import colors from 'picocolors'

describe('String Functions', () => {
	describe('highlighter', () => {
		it('should return highlight a string', () => {
			const plugin = { name: 'test', version: '1.0.0' }

			const highlightedVersion = highlighter(plugin)
			expect(highlightedVersion).toBe(
				`  ${colors.green('➜')}  ${colors.white(plugin.name)}: ${colors.cyan(plugin.version)}`
			)
		})
	})
})
